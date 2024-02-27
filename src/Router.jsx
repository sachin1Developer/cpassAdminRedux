import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from "./pages/loginPage/Login";
import PlayGround from "./components/sidebar/PlayGround";
import Dashboard from "./pages/dashboard/Dashboard";
import ViewSubsRange from "./pages/operatorConfig/subscriberRange/ViewSubsRange";
import VIewDetails from "./pages/operatorConfig/subscriberRange/VIewDetails";
import AddSubsRange from "./pages/operatorConfig/subscriberRange/AddSubsRange";
import ModifySubsRange from "./pages/operatorConfig/subscriberRange/ModifySubsRange";
import ViewPolicy from "./pages/operatorConfig/policyManagement/ViewPolicy";
import AddPolicy from "./pages/operatorConfig/policyManagement/AddPolicy";
import VIewPolicyDetails from "./pages/operatorConfig/policyManagement/VIewPolicyDetails";
import ModifyPolicy from "./pages/operatorConfig/policyManagement/ModifyPolicy";
import AddBlacklist from "./pages/operatorConfig/blacklistManagement/AddBlacklist";
import BlacklistManage from "./pages/operatorConfig/blacklistManagement/BlacklistManage";
import SearchBlacklist from "./pages/operatorConfig/blacklistManagement/SearchBlacklist";
import ModifyBlacklistRange from "./pages/operatorConfig/blacklistManagement/ModifyBlacklistRange";
import ViewRoleType from "./pages/operatorConfig/roleTypeManagement/ViewRoleType";
import ViewDetailsRole from "./pages/operatorConfig/roleTypeManagement/ViewDetailsRole";
import AddRoleType from "./pages/operatorConfig/roleTypeManagement/AddRoleType";

const Router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PlayGround />} >
                <Route path="" element={<Dashboard />} />

                {/* Subscriber Ramge */}
                <Route path="operatorConfig/viewSubscriberRange" element={<ViewSubsRange />} />
                <Route path="/operatorConfig/viewDetailSubsRange" element={<VIewDetails />} />
                <Route path="/operatorConfig/addSubscriberRange" element={<AddSubsRange />} />
                <Route path="operatorConfig/modifySubscriberRange" element={<ModifySubsRange />} />


                {/* Policy Management  */}
                <Route path="/operatorConfig/viewPolicy" element={<ViewPolicy />} />
                <Route path="/operatorConfig/detailsPolicy" element={<VIewPolicyDetails />} />
                <Route path="/operatorConfig/modifyPolicy" element={<ModifyPolicy />} />
                <Route path="/operatorConfig/addPolicy" element={<AddPolicy />} />


                {/* Subscriber Management */}
                <Route path="/operatorConfig/blacklistManagemment/addBlacklist" element={<AddBlacklist />} />
                <Route path="/operatorConfig/blacklistManagemment/manageBlacklist" element={<BlacklistManage />} />
                <Route path="/operatorConfig/blacklistManagemment/searchBlacklist" element={<SearchBlacklist />} />
                <Route path="/operatorConfig/blacklistManagemment/modifyBlacklist" element={<ModifyBlacklistRange />} />


                {/* Role type */}
                <Route path="/operatorConfig/viewRoleType" element={<ViewRoleType />} />
                <Route path="/operatorConfig/viewDetailsRole/:id" element={<ViewDetailsRole />} />
                <Route path="/operatorConfig/addRoleType" element={<AddRoleType />} />
                {/* <Route path="/operatorConfig/modifyRoleType" element={<ModifyRole />} /> */}



            </Route>
        </>
    )
)

export default Router;