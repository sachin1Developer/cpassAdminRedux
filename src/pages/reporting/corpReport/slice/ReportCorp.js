import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import CheckTokenExpired from '../../../../components/CheckTokenExpired';

const initialState = {
    data: null,
    isLoading: true,
    error: false
}

export const getCorpReport = createAsyncThunk("getCorpReport", async (data) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/betweenDatesCorpRbt?startDate=${data.start}T00:00:00&endDate=${data.end}T23:59:59`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    response.catch((err)=>{
        CheckTokenExpired(err?.response?.status)
    })
    return response;
})

export const getCorpSummaryReports = createAsyncThunk("getCorpSummaryReports", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/SystemConfig/getcorpRbtSummaryReports`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    // console.log(response)
    response.catch((err)=>{
        CheckTokenExpired(err?.response?.status)
    })
    return response;
})

export const getCorpReportBySpecificId = createAsyncThunk("getCorpReportBySpecificId", async (data) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/getCorpRbtById/${data.id}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    response.catch((err)=>{
        CheckTokenExpired(err?.response?.status)
    })
    return response;
})

export const ReportCorp = createSlice({
    name: 'reportCorp',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getCorpReport.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.error = false
            state.isLoading = false
        })
        builder.addCase(getCorpReport.pending, (state) => {
            state.error = false
            state.isLoading = true
        })
        builder.addCase(getCorpReport.rejected, (state) => {
            state.error = true
            state.isLoading = false
        })
    }
})  

export default ReportCorp.reducer