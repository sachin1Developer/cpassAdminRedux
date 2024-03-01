import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: null,
    isLoading: true,
    error: false
}

export const getAdReport = createAsyncThunk("getAdReport", async (data) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/betweenDatesAddRbt?startDate=${data.start}T00:00:00&endDate=${data.end}T23:59:59`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})

export const getAdSummaryReports = createAsyncThunk("getAdSummaryReports", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/SystemConfig/getADVSummaryReports`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    // console.log(response)
    return response;
})

export const getAdReportBySpecificId = createAsyncThunk("getAdReportBySpecificId", async (data) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/getAddRbtById/${data.id}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})

export const ReportAd = createSlice({
    name: 'reportAd',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAdReport.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.error = false
            state.isLoading = false

        })
        builder.addCase(getAdReport.pending, (state) => {
            state.error = false
            state.isLoading = true
        })
        builder.addCase(getAdReport.rejected, (state) => {
            state.error = true
            state.isLoading = false
        })
    }
})

export default ReportAd.reducer