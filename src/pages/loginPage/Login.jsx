import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { TextField } from '@mui/material';
import authImage from '../../image/auth-decoration.png'
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { addData } from './slice/VendorDataSlice';
import { addToken } from './slice/TokenSlice'
import CommanButton from '../../components/CommanButton';
import { styled } from '@mui/material/styles';
import { useSignal } from '@preact/signals-react';
import Loader from '../../components/loader/Loader';

const emptyToastId = "notNull"
const invalidToastId = 'notValid'

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#6366f1',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#E0E3E7',
        },
        '&:hover fieldset': {
            borderColor: '#6366f1',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#6366f1',
        },
    },
});

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const username = useSignal('');
    const password = useSignal('');
    const loading = useSignal(false);
    const firstElement = useRef("");
    const lastElement = useRef("");

    const loginApi = () => {
        if (username.length !== 0 && password.length !== 0) {
            let response = {
                username: username.value,
                password: password.value
            };
            let url = `${process.env.REACT_APP_API_URL}/signin`
            loading.value = true;
            axios.post(url, response)
                .then((resp) => {
                    const redirectStatus = resp.data.httpStatusCode;

                    if (redirectStatus === 200) {
                        console.log(resp)
                        const links = resp.data?.body[2]?.httpLinkslst
                        links?.map((link) => {
                            if (link?.linkId === parseInt(process.env.REACT_APP_CAMPAIGN_APPROVAL_LINK)) {
                                localStorage.setItem("campApprove", JSON.stringify(link))
                            }
                        })
                        dispatch(addData(resp.data?.body[0]))
                        dispatch(addToken(resp.data?.body[1]))
                        const encryptedUserData = CryptoJS.AES.encrypt(JSON.stringify(resp.data.body[0]), `${process.env.React_APP_TOKEN_SECURITY_KEY}`).toString();
                        const encryptedToken = CryptoJS.AES.encrypt(JSON.stringify(resp.data.body[1]), `${process.env.React_APP_TOKEN_SECURITY_KEY}`).toString();
                        localStorage.setItem("Token", encryptedToken);
                        localStorage.setItem("UserData", encryptedUserData);

                        navigate('/')

                    } else {
                        loading.value = false
                        toast.error("Invalid credentail", { position: "top-center", toastId: invalidToastId });
                        firstElement.current.children[1].children[0].focus()
                    }
                })
                .catch((error) => {
                    loading.value = false
                    console.log(error);
                });
        } else {
            toast.error("Please enter credentail", { toastId: emptyToastId })
            firstElement.current.children[1].children[0].focus()
        }

    }


    useEffect(() => {
        firstElement.current.children[1].children[0].focus()
    }, [])

    if (loading.value) {
        return (
            <div style={{ height: '100vh' }}>
                <Loader />
            </div>
        )
    } else {
        return (
            <div className='d-flex row primary'>
                <div className='d-flex justify-content-center align-items-center flex-column col' style={{ height: '100vh' }}>
                    <h3 className='m-2 fw-bold'>Welcome To Outreach Portal !✨</h3>
                    <CssTextField id="Username" className='m-2 w-50' label="Username" variant="outlined" onChange={(e) => { username.value = e.target.value }} onKeyDown={e => e.key === "Enter" ? lastElement.current.children[1].children[0].focus() : undefined} ref={firstElement} />

                    <CssTextField id="Password" className='m-2 w-50' label="Password" variant="outlined" type='password' onChange={e => { password.value = e.target.value }} onKeyDown={e => e.key === "Enter" ? loginApi() : undefined} ref={lastElement} />
                    <CommanButton type="button" className='my-2' onClick={loginApi} >Login</CommanButton>
                </div>
                <div className='d-flex align-items-center col' style={{ backgroundColor: 'rgb(211,215,253)' }}>
                    <div>
                        <img className='picture' alt="" src={authImage}></img>
                    </div>
                </div>
            </div>

        );
    }



};

export default Login;
