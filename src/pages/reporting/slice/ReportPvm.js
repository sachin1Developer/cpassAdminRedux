import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: null,
    isLoading: true,
    error: false
}

export const getPvmReport = createAsyncThunk("getPvmReport", async (data) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/betweenDatesFromCampaign_master?startDate=${data.start}%2000:00:00&endDate=${data.end}%2000:00:00`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})

export const ReportPvm = createSlice({
    name: 'reportPvm',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getPvmReport.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.error = false
            state.isLoading = false
        })
        builder.addCase(getPvmReport.pending, (state) => {
            state.error = false
            state.isLoading = true
        })
        builder.addCase(getPvmReport.rejected, (state) => {
            state.error = true
            state.isLoading = false
        })
    }
})  

export default ReportPvm.reducer