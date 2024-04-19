import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CheckTokenExpired from "../../../../components/CheckTokenExpired";


export const getUserActivity = createAsyncThunk("getUserActivity", async (data) => {
    const response = axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/OperatorConfiguration/detailsOfUsersActivity?startDate=${data.startDate}&endDate=${data.endDate}&userId=${data.userId}`,
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