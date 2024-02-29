import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getParamList = createAsyncThunk("getParamList", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/SystemConfig/getappconfigparams`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    // console.log(response)
    return response;
})

export  const addAppParams = createAsyncThunk("addAppParams", async (data) => {
    const response = axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}//SystemConfig/saveAppConfigParams`,
        data: data.data,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})


export  const updateAppParam = createAsyncThunk("updateAppParam", async (data) => {
    const response = axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}/SystemConfig/updateAppConfigParmasDetails/${data.id}`,
        data: data.data,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})


export  const deleteParams = createAsyncThunk("deleteParams", async (data) => {
    const response = axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}/SystemConfig/deleteAppConfigParamsByPARAM_ID/${data.id}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})