import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getUserList = createAsyncThunk("getUserList", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/OperatorConfiguration/allSelectedUsers`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    // console.log(response)
    return response;
})

export const getRoleTypeNameAndId = createAsyncThunk("getRoleTypeNameAndId", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/OperatorConfiguration/gethitroleIdandNames`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    // console.log(response)
    return response;
})

export  const createUser = createAsyncThunk("createUser", async (data) => {
    const response = axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/OperatorConfiguration/createUser`,
        data: data.data,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})


export  const getUserbyName = createAsyncThunk("getUserbyName", async (data) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/OperatorConfiguration/specificUsers?username=${data.name}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})


export  const modifyUserType = createAsyncThunk("modifyUserType", async (data) => {
    const response = axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}/OperatorConfiguration/updateUser`,
        data: data.data,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})


export  const deleteUserByName = createAsyncThunk("deleteUserByName", async (data) => {
    const response = axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}/OperatorConfiguration/deleteBYUsername/${data.id}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})




// for Vendor



export const getVendorList = createAsyncThunk("getVendorList", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/OperatorConfiguration/allVendor`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    // console.log(response)
    return response;
})

export  const deleteVendorById = createAsyncThunk("deleteVendorById", async (data) => {
    const response = axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}/OperatorConfiguration/deleteVendor/${data.id}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})


export  const createVendor = createAsyncThunk("createVendor", async (data) => {
    const response = axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/OperatorConfiguration/createVendor`,
        data: data.data,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})




export  const getVendorById = createAsyncThunk("getVendorById", async (data) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/OperatorConfiguration/getVendor/${data.id}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})

export  const modifyVendor = createAsyncThunk("modifyVendor", async (data) => {
    const response = axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}/OperatorConfiguration/updateVendor/${data.id}`,
        data: data.data,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})