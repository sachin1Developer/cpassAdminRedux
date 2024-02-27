import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from 'crypto-js';

const encryptedToken = localStorage.getItem("Token")


const initialState = {
    data: (encryptedToken === null ? null : JSON.parse(CryptoJS.AES.decrypt(encryptedToken, `${process.env.React_APP_TOKEN_SECURITY_KEY}`).toString(CryptoJS.enc.Utf8)))
}
export const TokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.data = action.payload
        }
    }
})

export const Token = TokenSlice.getInitialState().data?.token ;

export const { addToken } = TokenSlice.actions

export default TokenSlice.reducer