import React, { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { signal, useSignal } from '@preact/signals-react';
import HeaderComponent from '../header/HeaderComponent';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import CampaignIcon from '@mui/icons-material/Campaign';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import WifiChannelIcon from '@mui/icons-material/WifiChannel';
import WebhookIcon from '@mui/icons-material/Webhook';
import TableViewSharpIcon from '@mui/icons-material/TableViewSharp';
import { hover } from '@testing-library/user-event/dist/hover';
import DashboardSharpIcon from '@mui/icons-material/DashboardSharp';
import PermDataSettingSharpIcon from '@mui/icons-material/PermDataSettingSharp';
import CampaignSharpIcon from '@mui/icons-material/CampaignSharp';
import ApprovalSharpIcon from '@mui/icons-material/ApprovalSharp';
import QueryStatsSharpIcon from '@mui/icons-material/QueryStatsSharp';
import Diversity2SharpIcon from '@mui/icons-material/Diversity2Sharp';
import Groups3SharpIcon from '@mui/icons-material/Groups3Sharp';
import SegmentSharpIcon from '@mui/icons-material/SegmentSharp';
import LocationSearchingSharpIcon from '@mui/icons-material/LocationSearchingSharp';
import PrecisionManufacturingSharpIcon from '@mui/icons-material/PrecisionManufacturingSharp';
import EditCalendarSharpIcon from '@mui/icons-material/EditCalendarSharp';
import AutoFixHighSharpIcon from '@mui/icons-material/AutoFixHighSharp';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import ReceiptSharpIcon from '@mui/icons-material/ReceiptSharp';
import WhatshotSharpIcon from '@mui/icons-material/WhatshotSharp';
import MilitaryTechSharpIcon from '@mui/icons-material/MilitaryTechSharp';
import VerticalAlignTopSharpIcon from '@mui/icons-material/VerticalAlignTopSharp';
import Diversity1SharpIcon from '@mui/icons-material/Diversity1Sharp';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import DnsIcon from '@mui/icons-material/Dns';
import LanguageIcon from '@mui/icons-material/Language';
import AppsOutageIcon from '@mui/icons-material/AppsOutage';
import Footer from '../footer/Footer';
import { getProfileData } from '../../pages/loginPage/slice/ProfileSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader'


const dark = {
    sidebar: {
        backgroundColor: '#1E293B',
        color: '#ffffff',
    },
    menu: {
        menuContent: '#1E293B',
        icon: '#59d0ff',
        hover: {
            backgroundColor: '#1E293B',
            color: '#C8C8C8',
        },
        disabled: {
            color: '#3e5e7e',
        }
    },
}

const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


const PlayGround = () => {
    const dispatch = useDispatch()
    const [collapsed, setCollapsed] = useState(false)
    const [toggled, setToggled] = useState(false)
    let tokenCheck = localStorage.getItem('Token')
    let token = useSelector(state => state.token?.data?.token)
    let userId = useSelector(state => state.vendor?.data?.user_id)
    const userDetails = useSelector(state => state.profile)
    console.log(userDetails)

    // useEffect(() => {
    //     window.addEventListener("resize", () => {window.innerWidth <  610 ? collapsed.value = true : collapsed.value = false});
    // }, [])

    useEffect(() => {
        dispatch(getProfileData({ token: token, id: userId }))
    }, [])



    const menuItemStyles = {
        root: {
            fontSize: '16px',
            fontWeight: 600,
        },
        icon: {
            color: dark.menu.icon,
            [`&.${menuClasses.disabled}`]: {
                color: dark.menu.disabled.color,
            },
        },
        SubMenuExpandIcon: {
            color: '#b6b7b9',
        },
        subMenuContent: ({ level }) => ({
            backgroundColor: level === 0 ? hexToRgba(dark.menu.menuContent, 1) : 'transparent',
        }),
        button: {
            [`&.${menuClasses.disabled}`]: {
                color: dark.menu.disabled.color,
            },
            '&:hover': {
                backgroundColor: hexToRgba(dark.menu.hover.backgroundColor, 1),
                color: dark.menu.hover.color,
            }
        },
        label: ({ open }) => ({
            fontWeight: open ? 600 : undefined,
        }),
    };

    if (tokenCheck === null) {
        return <Navigate to="/login" />
    }

    if (userDetails?.isLoading) {
        return <Loader />
    } else {
        return (
            <div style={{ display: 'flex', height: '100%' }} className='user-select-none' >
                <Sidebar
                    collapsed={collapsed}
                    transitionDuration={600}
                    toggled={toggled}
                    onBackdropClick={() => setToggled(false)}
                    breakPoint="sm"
                    backgroundColor={hexToRgba(dark.sidebar.backgroundColor, 1)}
                    rootStyles={{
                        color: dark.sidebar.color,
                    }}
                    width='280px'
                    style={{ height: '100vh', position: 'sticky', top: '0', left: "0", zIndex: '2' }}
                >
                    <div className='mx-2 my-4  p-3 d-flex align-items-start justify-content-center fs-3 fw-bold rounded' style={{ height: '100px' }} >
                        <button id="collapse"
                            onClick={() => { setCollapsed(!collapsed) }} style={{ border: 0, background: 'transparent', color: 'white', display: 'flex', alignItems: 'center' }}><MenuOutlinedIcon />
                            {
                                !collapsed &&
                                <div className='mx-3 fw-bold'>
                                    OUTREACH
                                </div>

                            }
                        </button>
                    </div>
                    <Menu menuItemStyles={menuItemStyles} transitionDuration={600} >
                        <MenuItem component={<Link to="/" />} icon={<DashboardSharpIcon style={{ color: 'white' }} />}  > Dashboard </MenuItem>
                        <SubMenu label="Campaign Configuration" icon={<PermDataSettingSharpIcon style={{ color: 'white' }} />}>
                            <SubMenu label="Campaigns" icon={<CampaignSharpIcon style={{ color: 'white' }} />}>
                                <MenuItem icon={<TableViewSharpIcon style={{ color: 'white' }} />} component={<Link to="/camapign/viewCamapign" />}> View Campaign </MenuItem>
                                <MenuItem icon={<InventoryIcon style={{ color: 'white' }} />} component={<Link to="/camapign/campaignStatus" />}> Campaign Status </MenuItem>
                                <MenuItem icon={<ApprovalSharpIcon style={{ color: 'white' }} />} component={<Link to="/camapign/campaignApproval" />}> Campaign Approval </MenuItem>
                                {/* <MenuItem icon={<QueryStatsSharpIcon style={{ color: 'white' }} />} component={<Link to="/camapign/campaignAnalytics" />}> Campaign Analytics </MenuItem> */}
                            </SubMenu>

                            {/* <MenuItem component={<Link to="/groupManagement/groupManager" />} icon={<Diversity1SharpIcon style={{ color: 'white' }} />}> Group Manager </MenuItem> */}

                            {/* <SubMenu label="Segment Management" icon={<SegmentSharpIcon style={{ color: 'white' }} />}>
    
                                <MenuItem icon={<TableViewSharpIcon style={{ color: 'white' }} />} component={<Link to="/segment/viewSegmenet" />}> View Segment </MenuItem>
    
                                <MenuItem icon={<LocationSearchingSharpIcon style={{ color: 'white' }} />} component={<Link to="/segment/mapSegment" />}> Add/Map Group to Segment </MenuItem>
    
                                <MenuItem icon={<Groups3SharpIcon style={{ color: 'white' }} />} component={<Link to="/segment/viewGroup" />}> View Group </MenuItem>
    
                                <MenuItem icon={<Groups3SharpIcon style={{ color: 'white' }} />} component={<Link to="/segment/segmentAutomate" />}> Segment Automate </MenuItem>
    
    
                                <MenuItem icon={<Diversity1SharpIcon style={{ color: 'white' }} />} component={<Link to="/segment/groupAutomate" />}> Group Automate </MenuItem>
    
                            </SubMenu> */}

                            {/* <MenuItem component={<Link to="/productManagement" />} icon={<InventorySharpIcon style={{ color: 'white' }} />}> Product Management </MenuItem> */}

                            <MenuItem component={<Link to="/templates/viewTemplates" />} icon={<ReceiptSharpIcon style={{ color: 'white' }} />}> Templates </MenuItem>


                            {/* <MenuItem component={<Link to="/triggerCampaign" />} icon={<WhatshotSharpIcon style={{ color: 'white' }} />}> Trigger Campaign </MenuItem>
    
                            <MenuItem component={<Link to="/btl" />} icon={<VerticalAlignTopSharpIcon style={{ color: 'white' }} />}> BTL </MenuItem> */}
                        </SubMenu>



                        <SubMenu label="Operator Configuration " className='submenu' icon={<WebhookIcon style={{ color: 'white' }} />}>
                            <MenuItem className='submenuCamp text-wrap' icon={<AppSettingsAltIcon style={{ color: 'white' }} />} component={<Link to="/operatorConfig/viewSubscriberRange" />}> Subscriber Range Management </MenuItem>

                            <MenuItem icon={<InventoryIcon style={{ color: 'white' }} />} component={<Link to="/operatorConfig/viewPolicy" />}> Policy Management  </MenuItem>

                            <MenuItem icon={<ContactEmergencyIcon style={{ color: 'white' }} />} component={<Link to="/operatorConfig/blacklistManagemment/addBlacklist" />}> Blacklist Management </MenuItem>

                            <MenuItem icon={<InventoryIcon style={{ color: 'white' }} />} component={<Link to="/operatorConfig/viewRoleType" />}>Role Type Management  </MenuItem>

                            <MenuItem icon={<InventoryIcon style={{ color: 'white' }} />} component={<Link to="/operatorConfig/userTypeManagement/viewUserType" />}>User Type Management  </MenuItem>

                            <MenuItem icon={<InventoryIcon style={{ color: 'white' }} />} component={<Link to="/operatorConfig/userActivityManagement" />}>User Activity Management  </MenuItem>
                        </SubMenu>

                        <SubMenu label="System Configuration" className='submenu' icon={<SettingsSuggestIcon style={{ color: 'white' }} />}>

                            {/* <MenuItem icon={<AppSettingsAltIcon style={{ color: 'white' }} />} component={<Link to="/systemConfiguration/applicationConfiguration" />}> Application Configuration </MenuItem> */}

                            <MenuItem icon={<InventoryIcon style={{ color: 'white' }} />} component={<Link to="/systemConfiguration/inventoryConfiguration" />}> Inventory Configuration </MenuItem>


                            <MenuItem icon={<WifiChannelIcon style={{ color: 'white' }} />} component={<Link to="/systemConfiguration/viewChannel" />} >CIC Configuration </MenuItem>

                            <MenuItem icon={<AppsOutageIcon style={{ color: 'white' }} />} component={<Link to="/systemConfiguration/appConfigParam" />}> App Config Param </MenuItem>

                            <MenuItem icon={<LanguageIcon style={{ color: 'white' }} />} component={<Link to="/systemConfiguration/countryCodeManagement" />}> Country Code Management </MenuItem>

                            <MenuItem icon={<DnsIcon style={{ color: 'white' }} />} component={<Link to="/systemConfiguration/serverManagement" />}> Server Management </MenuItem>

                            <MenuItem icon={<SettingsVoiceIcon style={{ color: 'white' }} />} component={<Link to="/systemConfiguration/voiceConfiguration" />}> Voice Configuration </MenuItem>


                        </SubMenu>

                        {/* <SubMenu label="Reporting" icon={<AssessmentIcon style={{ color: 'white' }} />} >
                            <MenuItem icon={<SummarizeOutlinedIcon style={{ color: 'white' }} />} component={<Link to='/pvmReport' />} >PVM-Report</MenuItem>
                            <MenuItem icon={<SummarizeOutlinedIcon style={{ color: 'white' }} />} component={<Link to='/corpReport' />} >Corp-Report</MenuItem>
                            <MenuItem icon={<SummarizeOutlinedIcon style={{ color: 'white' }} />} component={<Link to='/adReport' />} >Ad-Report</MenuItem>
                        </SubMenu> */}


                        {/* <SubMenu label="Reports" className='submenu' icon={<AssessmentIcon style={{ color: 'white' }} />}>
                            <SubMenu className='submenu' label="PVM" icon={<SummarizeOutlinedIcon style={{ color: 'white' }} />} >
                                <MenuItem className='submenu' icon={<SummarizeOutlinedIcon style={{ color: 'white' }} />} component={<Link to="/campaignReport/reportPVM" />}> OBD Duration </MenuItem>
                                <MenuItem className='submenu' icon={<SummarizeOutlinedIcon style={{ color: 'white' }} />} component={<Link to="/campaignReport/reportPVM" />}> OBD Campaign </MenuItem>
                                <MenuItem className='submenu' icon={<SummarizeOutlinedIcon style={{ color: 'white' }} />} component={<Link to="/campaignReport/reportPVM" />}> OBD Failure </MenuItem>
                            </SubMenu>
                            <MenuItem className='submenu' icon={<SummarizeOutlinedIcon style={{ color: 'white' }} />} component={<Link to="/campaignReport/reportCorp" />}> Corp-RBT </MenuItem>
                            <MenuItem className='submenu' icon={<SummarizeOutlinedIcon style={{ color: 'white' }} />} component={<Link to="/campaignReport/reportAd" />}> Ad-RBT </MenuItem>
                        </SubMenu> */}
                    </Menu>
                </Sidebar>
                <main className='w-100 container-fluid' style={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                    <div className='border-bottom border-black' style={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '1' }}>
                        <HeaderComponent />
                    </div>
                    {/* <hr style={{ margin: 0, padding: 0, marginBottom: '1em' }} /> */}

                    <Outlet />

                    <div className='border-top shadow-lg bg-body-tertiary rounded' style={{ marginTop: 'auto', position: 'sticky', bottom: '0', right: '0', backgroundColor: 'white', zIndex: '1' }}>
                        <Footer />
                    </div>
                </main>
            </div>
        );
    }


};

export default PlayGround;
