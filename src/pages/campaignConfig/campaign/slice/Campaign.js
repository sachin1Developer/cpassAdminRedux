import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getCampaignByDistinct = createAsyncThunk("getCampaignByDistinct", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/SystemConfig/getAllCampaign`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    // console.log(response)
    return response;
})

// export  const addPolicyManagement = createAsyncThunk("addPolicyManagement", async (data) => {
//     const response = axios({
//         method: 'post',
//         url: `${process.env.REACT_APP_API_URL}/savePolicy`,
//         data: data.data,
//         headers: {
//             "Authorization": `Bearer ${data.token}`
//         },
//     })
//     // console.log(response)
//     return response;
// })


// export  const modifyPolicyManagement = createAsyncThunk("modifyPolicyManagement", async (data) => {
//     const response = axios({
//         method: 'put',
//         url: `${process.env.REACT_APP_API_URL}/updatePolicy/${data.id}`,
//         data: data.data,
//         headers: {
//             "Authorization": `Bearer ${data.token}`
//         },
//     })
//     // console.log(response)
//     return response;
// })


export  const deleteCampaignById = createAsyncThunk("deleteCampaignById", async (data) => {
    const response = axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}/SystemConfig/deleteCampaignById/${data.id}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})


export const getCampaignApproval = createAsyncThunk("getCampaignApproval", async (data) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/updateCampaignStatus/${data.status}/${data.campId}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})



export const getAllCampaign = createAsyncThunk("getAllCampaign", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/getAllCampaign`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    // console.log(response)
    return response;
})


export const getOriginationNumber = createAsyncThunk("getOriginationNumber", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/getAllOriginationNUmber`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    // console.log(response)
    return response;
})

export const createPvm = createAsyncThunk("createPvm", async (data) => {
    const response = axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/SystemConfig/createCampaign`,
        data: data.data,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response

})

export const getCampaignStatusByFilter = createAsyncThunk("getCampaignStatusByFilter", async (data) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/findCampaignStatusNew/${data.status}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})

export const getCampaignStatusfor15Days = createAsyncThunk("getCampaignStatusfor15Days", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/findCampaignStatusNewStartDateEndDate/today/lastfifteen`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    // console.log(response)
    return response;
})

export const getCampaignStatusforDateWise = createAsyncThunk("getCampaignStatusforDateWise", async (data) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/findCampaignStatusNewStartDateEndDate/${data.start} 00:00/${data.end} 23:59`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})