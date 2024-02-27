import React from 'react';
import BarChart from '../../components/graph/BarChart';


function Dashboard() {

    return (
        <div className='d-flex'>
            <div className='container-fluid my-2'>
                <div className='my-2'>
                    <div className='d-flex my-4 mx-4 row'>
                        <div className='col'>
                            Current Running
                        </div>
                        <div className='col'>
                            Campaign Inventory
                            <BarChart data={[700, 200, 500]} catagory={[
                                ['Dailed', '[700]'],
                                ['Success', '[200]'],
                                ['Failed', '[500]'],
                            ]} width='300px' />
                        </div>
                        <div className='col'>
                            Status Activity
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );


}
export default Dashboard;