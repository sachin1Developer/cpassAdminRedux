import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const viewBlacklistManagement = createAsyncThunk("viewBlacklistManagement", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/getAllPolices`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    // console.log(response)
    return response;
})

export  const addMsisdnToBlacklist= createAsyncThunk("addMsisdnToBlacklist", async (data) => {
    const response = axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}//updateBlacklistMsisdn?rangeId=${data.id}&msisdn=${data.msisdn}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})

export  const addGroupMsisdnToBlacklist = createAsyncThunk("addGroupMsisdnToBlacklist", async (data) => {
    const response = axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/uploadBlacklistMsisdnByFile`,
        data: data.data,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})


export  const modifyBlacklistManagement = createAsyncThunk("modifyBlacklistManagement", async (data) => {
    const response = axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}/updateBlackListRange/${data.id}`,
        data: data.data,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})


export  const deleteBlacklistGroup = createAsyncThunk("deleteBlacklistGroup", async (data) => {
    const response = axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}/deleteBlackListManagerGroup/${data.id}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})


export  const deleteBlacklistRange = createAsyncThunk("deleteBlacklistRange", async (data) => {
    const response = axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}/deleteBlackListRange/${data.id}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})

export  const getBlacklistName = createAsyncThunk("getBlacklistName", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/rangeNamesOnlyFromBlkackListRanges`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    // console.log(response)
    return response;
})


export  const addRangeBlacklist = createAsyncThunk("addRangeBlacklist", async (data) => {
    const response = axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/rangeNamesOnlyFromBlkackListRanges`,
        data: data.data,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})


export  const addGroupBlacklistMsisdn = createAsyncThunk("addGroupBlacklist", async (data) => {
    const response = axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/uploadBlacklistMsisdn`,
        data: data.data,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})


export const getBlacklistRange = createAsyncThunk("getBlacklistRange", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/getBlackListRange`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    // console.log(response)
    return response;
})

export const getBlacklistGroupName  = createAsyncThunk("getBlacklistGroupName", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/getCountAndDetailsByRangeId`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    // console.log(response)
    return response;
})


export const searchSpecificMsisdninBlacklist  = createAsyncThunk("searchSpecificMsisdninBlacklist", async (data) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/getBlackListGroupForSpecificMsisdn/${data.id}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})


export  const deleteBlacklistManagerGroup = createAsyncThunk("deleteBlacklistManagerGroup", async (data) => {
    const response = axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}/deleteBlackListManagerGroup/${data.id}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})