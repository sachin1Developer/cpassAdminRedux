import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CheckTokenExpired from "../../../../components/CheckTokenExpired";


export const viewPolicyManagement = createAsyncThunk("viewPolicyManagement", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/OperatorConfiguration/getAllPolices`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    // console.log(response)
    response.catch((err)=>{
        CheckTokenExpired(err?.response?.status)
    })
    return response;
})

export  const addPolicyManagement = createAsyncThunk("addPolicyManagement", async (data) => {
    const response = axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/OperatorConfiguration/savePolicy`,
        data: data.data,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    response.catch((err)=>{
        CheckTokenExpired(err?.response?.status)
    })
    return response;
})


export  const modifyPolicyManagement = createAsyncThunk("modifyPolicyManagement", async (data) => {
    const response = axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}/OperatorConfiguration/updatePolicy/${data.id}`,
        data: data.data,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    response.catch((err)=>{
        CheckTokenExpired(err?.response?.status)
    })
    return response;
})


export  const deletePolicyManagement = createAsyncThunk("deletePolicyManagement", async (data) => {
    const response = axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}/OperatorConfiguration/deletePolicy/${data.id}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    response.catch((err)=>{
        CheckTokenExpired(err?.response?.status)
    })
    return response;
})