import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getSystemVoiceList = createAsyncThunk("getSystemVoiceList", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/SystemConfig/activeVoiceNames`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    // console.log(response)
    return response;
})

export  const addVoice = createAsyncThunk("addVoice", async (data) => {
    const response = axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}//SystemConfig/saveVoiceinMaster`,
        data: data.data,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})


export  const modifyVoice = createAsyncThunk("modifyVoice", async (data) => {
    const response = axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}/SystemConfig/updateVoiceDetails/${data.id}`,
        data: data.data,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})


export  const deleteVoiceById = createAsyncThunk("deleteVoiceById", async (data) => {
    const response = axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}/SystemConfig/deleteVoiceById/${data.id}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})