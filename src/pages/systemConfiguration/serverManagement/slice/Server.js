import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CheckTokenExpired from "../../../../components/CheckTokenExpired";


export const getServer = createAsyncThunk("getServer", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/SystemConfig/getServerMaster`,
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

export  const createServer = createAsyncThunk("createServer", async (data) => {
    const response = axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/SystemConfig/saveServerMaster`,
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


export  const modifyServer = createAsyncThunk("modifyServer", async (data) => {
    const response = axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}/SystemConfig/updateServerMasterDetails/${data.id}`,
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


export  const deleteServer = createAsyncThunk("deleteServer", async (data) => {
    const response = axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}/SystemConfig/deleteServerByID/${data.id}`,
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