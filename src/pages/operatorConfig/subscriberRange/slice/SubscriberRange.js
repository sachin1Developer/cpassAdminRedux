import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const viewSubscriberRange = createAsyncThunk("viewSubscriberRange", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/getOperatorSubscriber`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    // console.log(response)
    return response;
})

export  const addSubscriberRange = createAsyncThunk("addSubscriberRange", async (data) => {
    const response = axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/saveOperatorSubscriber`,
        data: data.data,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})


export  const modifySubscriberRange = createAsyncThunk("modifySubscriberRange", async (data) => {
    const response = axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}/updateOperatorSubscriber/${data.id}`,
        data: data.data,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})


export  const deleteSubscriberRange = createAsyncThunk("deleteSubscriberRange", async (data) => {
    const response = axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}/deleteOperatorSubscriber/${data.id}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})