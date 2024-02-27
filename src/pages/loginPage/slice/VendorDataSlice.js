import { createSlice } from '@reduxjs/toolkit'
import CryptoJS from 'crypto-js';

const encryptedUserData = localStorage.getItem("UserData")

export const VendorDataSlice = createSlice({
    name: 'login',
    initialState: {
        data: (encryptedUserData === null ? null : JSON.parse(CryptoJS.AES.decrypt(encryptedUserData, `${process.env.React_APP_TOKEN_SECURITY_KEY}`).toString(CryptoJS.enc.Utf8)))
    },
    reducers: {
        addData: (state, action) => {
            state.data = action.payload
        },
    },
})
export const { addData } = VendorDataSlice.actions

export default VendorDataSlice.reducer