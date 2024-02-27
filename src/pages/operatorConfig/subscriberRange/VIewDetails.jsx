import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CommanButton from '../../../components/CommanButton';


function VIewDetails() {
    const location = useLocation();
    console.log(location.state.data)

    // const [subsRange, setSubsRange] = useState([]);
    // countryCode
    // : 
    // "8"
    // endsAt
    // : 
    // "8999999999"
    // hlrId
    // : 
    // 1
    // rangeId
    // : 
    // 5
    // rangeName
    // : 
    // "ind"
    // rangeOwner
    // : 
    // "O"
    // rangeType
    // : 
    // "A"
    // startsAt
    // : 
    // "8000000000"

    return (
        <div className='container'>
            <div className='d-flex justify-content-center my-4'>
                <h3>View Subscriber Range</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table>
                    <thead>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Range Name
                            </td>
                            <td className='px-5 py-3'> {location.state.data?.rangeName}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3'
                                style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Start Range
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.startsAt}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3 ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                End Range
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.endsAt} </td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Country Code
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.countryCode}</td>
                        </tr>
                        <tr style={{ border: '1px solid #c1bbbb' }}>
                            <td className='px-5 py-3  ' style={{ fontWeight: 'bold', border: '1px solid #c1bbbb' }}>
                                Range Owner
                            </td>
                            <td className='px-5 py-3'>{location.state.data?.rangeOwner}</td>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="d-flex justify-content-center my-4">
                <Link to='/operatorConfig/viewSubscriberRange'>
                    <CommanButton type="submit" className="btnBack mb-3" ><ArrowBackIosIcon />Back</CommanButton>
                </Link>
            </div>
        </div>
    );


}

export default VIewDetails;