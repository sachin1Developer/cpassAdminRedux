import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: null,
    isLoading: true,
    error: false
}

export const getPvmReportBySpecificId = createAsyncThunk("getPvmReportBySpecificId", async (data) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/getCampaignById/${data.id}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})

export const ReportPvmBySpecificId = createSlice({
    name: 'reportPvmBySpecificId',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getPvmReportBySpecificId.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.error = false
            state.isLoading = false
        })
        builder.addCase(getPvmReportBySpecificId.pending, (state) => {
            state.error = false
            state.isLoading = true
        })
        builder.addCase(getPvmReportBySpecificId.rejected, (state) => {
            state.error = true
            state.isLoading = false
        })
    }
})  

export default ReportPvmBySpecificId.reducer