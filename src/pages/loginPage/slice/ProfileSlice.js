import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: {},
    isLoading: true,
    error: false
}

export const getProfileData = createAsyncThunk("getProfileData", async (data) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/getVendorById/${data.id}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})

export const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProfileData.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.error = false
            state.isLoading = false
        })
        builder.addCase(getProfileData.pending, (state) => {
            state.error = false
            state.isLoading = true
        })
        builder.addCase(getProfileData.rejected, (state) => {
            state.error = true
            state.isLoading = false
        })
    }
})  

export default ProfileSlice.reducer