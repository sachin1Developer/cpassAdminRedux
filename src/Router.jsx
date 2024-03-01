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
import ModifyRole from "./pages/operatorConfig/roleTypeManagement/ModifyRole";
import ViewUserType from "./pages/operatorConfig/useTypeManagement/ViewUserType";
import AddUser from "./pages/operatorConfig/useTypeManagement/user/AddUser";
import ViewDetailsUser from "./pages/operatorConfig/useTypeManagement/user/ViewDetailsUser";
import ModifyUser from "./pages/operatorConfig/useTypeManagement/user/ModifyUser";
import AddVendor from "./pages/operatorConfig/useTypeManagement/vendor/AddVendor";
import ViewDetailsVendor from "./pages/operatorConfig/useTypeManagement/vendor/ViewDetailsVendor";
import ModifyVendor from "./pages/operatorConfig/useTypeManagement/vendor/ModifyVendor";
import UserActivity from "./pages/operatorConfig/userActivityManagement/UserActivity";
import ViewCampaign from "./pages/campaignConfig/campaign/ViewCampaign";
import ViewTemplate from "./pages/campaignConfig/templates/ViewTemplate";
import AddTemplate from "./pages/campaignConfig/templates/AddTemplate";
import CampViewDetails from "./pages/campaignConfig/campaign/CampViewDetails";
import CampaignStatus from "./pages/campaignConfig/campaign/CampaignStatus";
import CampaignApproval from "./pages/campaignConfig/campaign/CampaignApproval";
import ViewParam from "./pages/systemConfiguration/appConfigParam/ViewParam";
import AddParam from "./pages/systemConfiguration/appConfigParam/AddParam";
import ModifyParam from "./pages/systemConfiguration/appConfigParam/ModifyParam";
import ViewCountryCode from "./pages/systemConfiguration/countryCode/ViewCountryCode";
import AddCountryCode from "./pages/systemConfiguration/countryCode/AddCountryCode";
import ModifyCountryCode from "./pages/systemConfiguration/countryCode/ModifyCountryCode";
import ViewServer from "./pages/systemConfiguration/serverManagement/ViewServer";
import AddServer from "./pages/systemConfiguration/serverManagement/AddServer";
import ModifyServer from "./pages/systemConfiguration/serverManagement/ModifyServer";
import ViewVoice from "./pages/systemConfiguration/voiceConfig/ViewVoice";
import AddVoice from "./pages/systemConfiguration/voiceConfig/AddVoice";
import ModifyVoice from "./pages/systemConfiguration/voiceConfig/ModifyVoice";
import InventoryConfig from "./pages/systemConfiguration/inventory/InventoryConfig";
import ModifyInventory from "./pages/systemConfiguration/inventory/ModifyInventory";

const Router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/login" element={<Login />} />
            <Route  element={<PlayGround />} >
                <Route path="/" element={<Dashboard />} />


                {/* Campaign */}
                <Route exact path="/camapign/viewCamapign" element={<ViewCampaign />} />
                <Route path="/camapign/viewCampDetails" element={<CampViewDetails />} />
                {/* <Route path="/campaign/createCampaign" element={<CreateCamp />} />
                <Route path="/campaign/modifyCampaign" element={<CreateCamp />} /> */}
                <Route path="/camapign/campaignStatus" element={<CampaignStatus />} />
                <Route path="/camapign/campaignApproval" element={<CampaignApproval />} />


                {/* Templates */}
                <Route path="/templates/viewTemplates" element={<ViewTemplate />} />
                <Route path="/templates/addTemplates" element={<AddTemplate />} />


                {/* Campaign Inventory */}
                <Route path="/systemConfiguration/inventoryConfiguration" element={<InventoryConfig />} />
                <Route path="/systemConfiguration/modifyInventoryConfiguration" element={<ModifyInventory />} />


                {/* Subscriber Ramge */}
                <Route path="/operatorConfig/viewSubscriberRange" element={<ViewSubsRange />} />
                <Route path="/operatorConfig/viewDetailSubsRange" element={<VIewDetails />} />
                <Route path="/operatorConfig/addSubscriberRange" element={<AddSubsRange />} />
                <Route path="/operatorConfig/modifySubscriberRange" element={<ModifySubsRange />} />


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
                <Route path="/operatorConfig/modifyRoleType/:id" element={<ModifyRole />} />


                {/* User Type */}
                <Route path="/operatorConfig/userTypeManagement/viewUserType" element={<ViewUserType />} />
                <Route path="/operatorConfig/userTypeManagement/addUserType" element={<AddUser />} />
                <Route path="/operatorConfig/userTypeManagement/viewUserTypeDetail/:name" element={<ViewDetailsUser />} />
                <Route path="/operatorConfig/userTypeManagement/modifyUserType" element={<ModifyUser />} />
                <Route path="/operatorConfig/userTypeManagement/addVendor" element={<AddVendor />} />
                <Route path="/operatorConfig/userTypeManagement/viewVendorDetail/:id" element={<ViewDetailsVendor />} />
                <Route path="/operatorConfig/userTypeManagement/modifyVendor" element={<ModifyVendor />} />
                <Route path="/operatorConfig/userActivityManagement" element={<UserActivity />} />


                {/* App Params */}
                <Route path="/systemConfiguration/appConfigParam" element={<ViewParam />} />
                <Route path="/systemConfiguration/addAppConfigParam" element={<AddParam />} />
                <Route path="/systemConfiguration/modifyAppConfigParam" element={<ModifyParam />} />

                {/* Country code   */}
                <Route path="/systemConfiguration/countryCodeManagement" element={<ViewCountryCode />} />
                <Route path="/systemConfiguration/addCountryCodeManagement" element={<AddCountryCode />} />
                <Route path="/systemConfiguration/modifyCountryCode" element={<ModifyCountryCode />} />


                {/* server */}
                <Route path="/systemConfiguration/serverManagement" element={<ViewServer />} />
                <Route path="/systemConfiguration/addServerManagement" element={<AddServer />} />
                <Route path="/systemConfiguration/modifyServerManagement" element={<ModifyServer />} />


                {/* Voice Configuration */}
                <Route path="/systemConfiguration/voiceConfiguration" element={<ViewVoice />} />
                <Route path="/systemConfiguration/AddVoiceConfiguration" element={<AddVoice />} />
                <Route path="/systemConfiguration/modifyVoiceConfiguration" element={<ModifyVoice />} />

            </Route>
        </>
    ),{basename:'/Outreach/Admin'}
)

export default Router;