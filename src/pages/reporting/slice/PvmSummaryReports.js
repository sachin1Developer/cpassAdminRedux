import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: null,
    isLoading: true,
    error: false
}

export const getPvmSummaryReports = createAsyncThunk("getPvmSummaryReports", async (token) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/SystemConfig/getPVMSummaryReports`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    // console.log(response)
    return response;
})

export const PvmSummaryReports = createSlice({
    name: 'pvmSummaryReports',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getPvmSummaryReports.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.error = false
            state.isLoading = false
        })
        builder.addCase(getPvmSummaryReports.pending, (state) => {
            state.error = false
            state.isLoading = true
        })
        builder.addCase(getPvmSummaryReports.rejected, (state) => {
            state.error = true
            state.isLoading = false
        })
    }
})  

export default PvmSummaryReports.reducer