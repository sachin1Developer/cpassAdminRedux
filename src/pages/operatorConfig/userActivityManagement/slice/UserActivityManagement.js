import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getUserActivity = createAsyncThunk("getUserActivity", async (data) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/OperatorConfiguration/detailsOfUsersActivity?startDate=${data.startDate}&endDate=${data.endDate}&userId=${data.userId}`,
        headers: {
            "Authorization": `Bearer ${data.token}`
        },
    })
    // console.log(response)
    return response;
})