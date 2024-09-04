import React, { useEffect, useState } from 'react'
import { AppSidebar, AppHeader } from '../../../components/index'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { CButton } from '@coreui/react'

const VendorKycDetails = () => {
    const [details, setDetails] = useState([])
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { id } = useParams();
    const host_id = id
    async function getDetails() {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}superAdmin/kyc/vendor`, { host_id: Number(host_id) }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        console.log(res.data, 'res');
        const ser = res.data.kyc;
        setDetails(ser);
    }

    useEffect(() => {
        getDetails()

    }, [])

    async function handleAccept() {
        const res = await axios.put(`${import.meta.env.VITE_BASE_URL}superAdmin/accept`, { host_id: Number(host_id) }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        navigate('/kyc/all')
    }

    async function handleReject() {
        const res = await axios.put(`${import.meta.env.VITE_BASE_URL}superAdmin/reject`, { host_id: Number(host_id) }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        navigate('/kyc/all')
    }

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1 m-4">
                    <div className='mt-4'>
                        Details Submitted:
                        <h4 className='mt-2'>Name: {details?.host?.username}</h4>
                        <h4 className='mt-2'>GST: {details?.gst}</h4>
                        <h4 className='mt-2'>COI:</h4>
                        <img src={details?.coi} alt='coi' style={{ maxWidth: "50%" }} />
                    </div>
                    <div className='d-flex gap-4 mt-5'>
                        <CButton color="primary" onClick={() => handleAccept()}>Accept</CButton>
                        <CButton color="secondary" onClick={() => handleReject()} className='ml-4'>Reject</CButton>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VendorKycDetails