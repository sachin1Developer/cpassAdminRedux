import { configureStore } from "@reduxjs/toolkit";
import TokenSlice from "../pages/loginPage/slice/TokenSlice";
import VendorDataSlice from "../pages/loginPage/slice/VendorDataSlice";
import ProfileSlice from "../pages/loginPage/slice/ProfileSlice";
import ReportPvm from "../pages/reporting/pvmReport/slice/ReportPvm";
import ReportPvmBySpecificId from "../pages/reporting/pvmReport/slice/ReportPvmBySpecificId";
import PvmSummaryReports from "../pages/reporting/pvmReport/slice/PvmSummaryReports";
import ReportCorp from "../pages/reporting/corpReport/slice/ReportCorp";
import ReportAd from "../pages/reporting/adReport/slice/ReportAd";

export const store = configureStore({

    reducer: {
        token:TokenSlice,
        vendor:VendorDataSlice,
        profile:ProfileSlice,
        reportPvm: ReportPvm,
        reportPvmBySpecificId: ReportPvmBySpecificId,
        getPvmSummaryReports: PvmSummaryReports,
        reportCorp: ReportCorp,
        reportAd: ReportAd,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    // devTools: false
})