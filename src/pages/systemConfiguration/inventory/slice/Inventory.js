import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getCampaignInventory = createAsyncThunk("getCampaignInventory", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/SystemConfig/getCampaignInventory`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    // console.log(response)
    return response;
})

// export  const createSystemCountryCode = createAsyncThunk("createSystemCountryCode", async (data) => {
//     const response = axios({
//         method: 'post',
//         url: `${process.env.REACT_APP_API_URL}/SystemConfig/saveCountry`,
//         data: data.data,
//         headers: {
//             "Authorization": `Bearer ${data.token}`
//         },
//     })
//     // console.log(response)
//     return response;
// })


export  const modifyCampaignInventory = createAsyncThunk("modifyCampaignInventory", async (data) => {
    const response = axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}/SystemConfig/updateCampaignInventoryDetails/${data.id}`,
        data: data.data,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})


// export  const deleteSystemCountryCode = createAsyncThunk("deleteSystemCountryCode", async (data) => {
//     const response = axios({
//         method: 'delete',
//         url: `${process.env.REACT_APP_API_URL}/SystemConfig/deleteCountryById/${data.id}`,
//         headers: {
//             "Authorization": `Bearer ${data.token}`
//         },
//     })
//     // console.log(response)
//     return response;
// })