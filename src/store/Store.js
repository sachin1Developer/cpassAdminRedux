import { configureStore } from "@reduxjs/toolkit";
import TokenSlice from "../pages/loginPage/slice/TokenSlice";
import VendorDataSlice from "../pages/loginPage/slice/VendorDataSlice";
import ProfileSlice from "../pages/loginPage/slice/ProfileSlice";

export const store = configureStore({

    reducer: {
        token:TokenSlice,
        vendor:VendorDataSlice,
        profile:ProfileSlice,

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    // devTools: false
})