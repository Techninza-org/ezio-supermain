import { CCard, CCardBody } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function TripToBidDetails() {
    const [trip, setTrip] = useState({})
    const { id } = useParams()
    useEffect(() => {
        async function getTrip() {
            const token = localStorage.getItem('token')
            const res = await axios.get(`http://103.189.172.172:3000/custom/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
            console.log(res.data);
            setTrip(res.data.custom_trip)
        }
        getTrip()
    }, [])

    return (
        <div >
            <h1 className='text-center mt-4 mb-4'>Custom Trip Details</h1>
            <div className='col-md-6 mx-auto mb-4'>
                <CCard className='d-flex justify-content-center '>
                    <CCardBody>
                        <div>
                            <p><span style={{ fontWeight: 'bold' }}>User:</span> {trip.user?.username}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Phone:</span> {trip.user?.phone}</p>
                            <p><span style={{ fontWeight: 'bold' }}>No. of people:</span> {trip.number_of_people}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Start Date:</span>{trip.start_date}</p>
                            <p><span style={{ fontWeight: 'bold' }}>End Date:</span>{trip.end_date}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Itinerary:</span></p>
                            <ul>
                                {
                                    trip.itinerary?.map((item, index) => (
                                        <li key={index}>
                                            <p><span style={{ fontWeight: 'bold' }}>Day {index + 1}</span></p>
                                            <p><span style={{ fontWeight: 'bold' }}>Destination:</span> {item.destination}</p>
                                            <p><span style={{ fontWeight: 'bold' }}>Activities:</span> {item.activities.join(', ')}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <Link to={`/bidding/service/${id}`}><button className='btn btn-primary'>Bid Your Service</button></Link>
                    </CCardBody>
                </CCard>
            </div>
        </div>
    )
}
