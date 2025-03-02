import React from 'react';
import { useNavigate } from 'react-router-dom';

function View() {
    const navigate = useNavigate();

    return (
        <div className='lg:bg-gradient-to-r from-purple-500 to-purple-800  lg:w-[1300px] lg:p-6 lg:ml-20 lg:mr-20 lg:mt-4 lg:h-auto md:flex-col md:w-[700px] rounded-lg shadow-lg transform transition hover:scale-95 hover:shadow-xl mx-4 flex flex-col p-4'>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
                <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer' onClick={() => navigate('/particular')}>
                    <h3 className='text-lg font-semibold'>Employee Information</h3>
                    <p className='text-sm text-gray-600'>View your employee details and records.</p>
                </div>
                <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer' onClick={() => navigate('/particular_shiftapprove')}>
                    <h3 className='text-lg font-semibold'>Shift Approved</h3>
                    <p className='text-sm text-gray-600'>Check approved shift details.</p>
                </div>
                <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer' onClick={() => navigate('/particular_rejectshift')}>
                    <h3 className='text-lg font-semibold'>Shift Reject</h3>
                    <p className='text-sm text-gray-600'>View rejected shift requests.</p>
                </div>
                <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer' onClick={() => navigate('/particular_leaveapprove')}>
                    <h3 className='text-lg font-semibold'>Leave Approve</h3>
                    <p className='text-sm text-gray-600'>Check approved leave details.</p>
                </div>
                <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer' onClick={() => navigate('/particular_rejectLeave')}>
                    <h3 className='text-lg font-semibold'>Leave Reject</h3>
                    <p className='text-sm text-gray-600'>View rejected leave requests.</p>
                </div>
            </div>
        </div>
    );
}

export default View;
