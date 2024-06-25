import { CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function TripDetails() {
    const [trip, setTrip] = useState({})
    const [service, setService] = useState({})
    const { id } = useParams()
    useEffect(() => {
        async function getTrip() {
            const token = localStorage.getItem('token')
            const res = await axios.get(`http://103.189.172.172:3000/host/trip/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
            console.log(res.data);
            setTrip(res.data.trip)
            setService(res.data.trip.service)
        }
        getTrip()
    }, [])

    return (
        <div >
            <h1 className='text-center mt-4 mb-4'>{trip.user?.username}</h1>
            <div className='col-md-6 mx-auto mb-4'>
                <CCard className='d-flex justify-content-center '>
                    <CCardBody>
                        <div>
                            <p><span style={{ fontWeight: 'bold' }}>Destination:</span> {service?.destination}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Description:</span> {service?.description}</p>
                            <p><span style={{ fontWeight: 'bold' }}>No. of people:</span> {trip.number_of_people}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Phone:</span> {trip.user?.phone}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Duration:</span> {service?.duration} days</p>
                            <p><span style={{ fontWeight: 'bold' }}>Start Date:</span>{trip.start_date}</p>
                            <p><span style={{ fontWeight: 'bold' }}>End Date:</span>{trip.end_date}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Booking Price:</span> Rs. {trip.cost}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Service Name:</span>{trip.service?.name}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Services:</span></p>
                            <ul className="">
                                {
                                    service?.services?.map((service, index) => (
                                        <li key={index}>{service}</li>
                                    ))
                                }
                            </ul>
                            <p><span style={{ fontWeight: 'bold' }}>Itinerary:</span></p>
                            <ol className="">
                                {
                                    service?.itinerary?.map((itinerary, index) => (
                                        <li key={index}>{itinerary}</li>
                                    ))
                                }
                            </ol>
                        </div>
                    </CCardBody>
                </CCard>
            </div>
        </div>
    )
}
