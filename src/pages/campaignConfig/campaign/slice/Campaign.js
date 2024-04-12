import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getCampaignByDistinct = createAsyncThunk("getCampaignByDistinct", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/CampaignConfiguration/getAllCampaign`,
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
//         url: `${process.env.REACT_APP_API_URL}/CampaignConfiguration/savePolicy`,
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
//         url: `${process.env.REACT_APP_API_URL}/CampaignConfiguration/updatePolicy/${data.id}`,
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
        url: `${process.env.REACT_APP_API_URL}/CampaignConfiguration/deleteCampaignById/${data.id}`,
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
        url: `${process.env.REACT_APP_API_URL}/CampaignConfiguration/updateCampaignStatus/${data.status}/${data.campId}`,
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
        url: `${process.env.REACT_APP_API_URL}/CampaignConfiguration/getAllCampaign`,
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
        url: `${process.env.REACT_APP_API_URL}/CampaignConfiguration/getAllOriginationNUmber`,
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
        url: `${process.env.REACT_APP_API_URL}/CampaignConfiguration/createCampaign`,
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
        url: `${process.env.REACT_APP_API_URL}/CampaignConfiguration/findCampaignStatusNew/${data.status}`,
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
        url: `${process.env.REACT_APP_API_URL}/CampaignConfiguration/findCampaignStatusNewStartDateEndDate/today/lastfifteen`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    console.log(response)
    return response;
})

export const getCampaignStatusforDateWise = createAsyncThunk("getCampaignStatusforDateWise", async (data) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/CampaignConfiguration/findCampaignStatusNewStartDateEndDate/${data.start} 00:00/${data.end} 23:59`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})