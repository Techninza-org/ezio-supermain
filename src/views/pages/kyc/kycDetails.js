import React, { useEffect, useState } from 'react'
import { AppSidebar, AppHeader } from '../../../components/index'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button } from '@coreui/coreui'
import { CButton, CImage } from '@coreui/react'

const KycDetails = () => {
    const [details, setDetails] = useState([])
    const [status, setStatus] = useState('')
    const token = localStorage.getItem('token')
    const { id } = useParams();
    const user_id = id;
    async function getDetails() {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}superAdmin/kyc`, { user_id: Number(user_id) }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const ser = res.data.kycDetails;
        const status = res.data.kyc_status;
        setDetails(ser);
        setStatus(status)
    }

    useEffect(() => {
        getDetails()

    }, [])

    async function handleAccept() {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}superAdmin/kyc/handle`, { user_id: Number(user_id), kycStatus: 1 }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (res.status === 400) {
            alert('not accepted!')
            return
        }
        alert('Accepted Successfully')
    }

    async function handleReject() {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}superAdmin/kyc/handle`, { user_id: Number(user_id), kycStatus: -1 }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (res.status === 400) {
            alert('not rejected!')
            return
        }
        alert('Rejected Successfully')
    }

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1 m-4">
                    <h1 className='text-center mb-4'>Kyc Details</h1>
                    {status === -1 && <p style={{ fontWeight: 'bold' }}>KYC Details Not Submitted!</p>}
                    {status !== -1 &&
                        <>
                            <p><span style={{ fontWeight: 'bold' }}>Name:</span> {details?.name}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Phone:</span> {details?.phone}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Alternate Phone:</span> {details?.alternate_phone}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Email:</span> {details?.email}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Alternate Email:</span> {details?.alternate_email}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Address:</span> {details?.address}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Document Type:</span> {details?.document_type}</p>
                            <div>
                                <h2 className='text-center mt-4 mb-4'>Document</h2>
                                <div className='d-flex justify-content-center'>
                                    <CImage src={details?.document} alt='document' width={'50%'}></CImage>
                                </div>
                            </div>
                        </>}
                    {status === 0 && <div className='d-flex justify-content-around mt-5'>
                        <CButton color="primary" onClick={() => handleAccept()}>Accept</CButton>
                        <CButton color="secondary" onClick={() => handleReject()} className='ml-4'>Reject</CButton>
                    </div>}
                    {status === 1 && <p style={{ fontWeight: 'bold' }}>KYC Already Accepted!</p>}
                </div>
            </div>
        </>
    )
}

export default KycDetails