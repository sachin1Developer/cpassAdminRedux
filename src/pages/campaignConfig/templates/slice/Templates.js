import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CheckTokenExpired from "../../../../components/CheckTokenExpired";


export const getLbsTemplates = createAsyncThunk("getLbsTemplates", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/getLbsTemplates`,
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

export  const addLbsTemplate = createAsyncThunk("addLbsTemplate", async (data) => {
    const response = axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/CampaignConfiguration/createLbsTemplate`,
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

export  const addLbsTemplateById = createAsyncThunk("addLbsTemplateById", async (data) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/CampaignConfiguration/getLbsTemplates/${data.id}`,
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


export  const modifyLbsTemplate = createAsyncThunk("modifyLbsTemplate", async (data) => {
    const response = axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}/CampaignConfiguration/updateLbsTemplate`,
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


export  const deleteLbsTemplate = createAsyncThunk("deleteLbsTemplate", async (data) => {
    const response = axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}/CampaignConfiguration/deletelbs_template/${data.id}`,
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