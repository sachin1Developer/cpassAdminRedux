import React, { useEffect, useState } from 'react';
import { Avatar, Chip, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { signal } from '@preact/signals-react'
import { useDispatch, useSelector } from 'react-redux';
import { addToken } from '../../pages/loginPage/slice/TokenSlice';
import { getProfileData } from '../../pages/loginPage/slice/ProfileSlice';


function HeaderComponent() {
    const dispatch = useDispatch()
    let [anchorEl, setAnchor] = useState(null)
    let token = useSelector(state => state.token?.data?.token)
    let userId = useSelector(state => state.vendor?.data?.user_id)
    const userDetails = useSelector(state => state.profile?.data?.username)

    useEffect(() => {
        // dispatch(getProfileData({ token: token, id: userId }))
        setAnchor(null)
    }, [])



    return (
        <div className='' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%', padding: '5px 20px' }}>
            <IconButton onClick={(event) => { setAnchor(event.currentTarget) }} >
                <Chip avatar={<Avatar style={{ color: '#ffffff' }} sx={{ fontWeight: "600", backgroundColor: '#6366f1' }}>{userDetails?.charAt(0)}</Avatar>} label={userDetails} variant="outlined" />
            </IconButton>
            <Menu
                // id="basic-menu"
                anchorEl={anchorEl}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={Boolean(anchorEl)}
                onClose={() => { setAnchor(null) }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                transitionDuration={500}
            >
                <div className='d-flex justify-content-center fs-5 badge' style={{ backgroundColor: '#6366f1' }}>Hello {userDetails}</div>
                <Link to="/" className="d-flex text-decoration-none" style={{ color: "black" }} onClick={() => { setAnchor(null)}} >
                    <MenuItem >
                        <ListItemIcon>
                            <Avatar sx={{ width: 24, height: 24 }} />
                        </ListItemIcon>
                        <ListItemText>My Profile</ListItemText>
                    </MenuItem>
                </Link>
                <Link to="/login" className="d-flex text-decoration-none" style={{ color: "black" }} onClick={() => { localStorage.clear(); dispatch(addToken(null)); anchorEl.value = null }} >
                    <MenuItem >
                        <ListItemIcon>
                            <Logout sx={{ width: 24, height: 24 }} />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </Link>
            </Menu>
        </div>
    );
}



export default HeaderComponent;
