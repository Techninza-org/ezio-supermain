import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CForm } from '@coreui/react';

const AddCustomService = () => {
    const [trip, setTrip] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        async function getTrip() {
            const token = localStorage.getItem('token')
            const res = await axios.get(`http://103.189.172.172:3000/custom/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTrip(res.data.custom_trip)
            const newItinerary = res.data.custom_trip.itinerary.map((item) => {
                return {
                    destination: item.destination,
                    activities: item.activities.map((activity) => {
                        return activity.split(',').map((values) => {
                            return {
                                activity: values,
                                available: true,
                                additional: false
                            };
                        });
                    })
                };
            });
            setFormData((prevData) => ({
                ...prevData,
                number_of_people: res.data.custom_trip.number_of_people,
                start_date: res.data.custom_trip.start_date,
                end_date: res.data.custom_trip.end_date,
                itinerary: newItinerary,
                user_id: res.data.custom_trip.user_id
            }))
        }
        getTrip()
    }, [])

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        user_id: '',
        custom_trip_id: Number(id),
        number_of_people: trip.number_of_people,
        price: '',
        itinerary: [],
        type: 2,
        start_date: '',
        end_date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'price') {
            if (isNaN(value)) {
                return;
            }
            setFormData((prevData) => ({
                ...prevData,
                price: Number(value)
            }))
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleActivityChange = (itineraryIndex, activityIndex, field, value) => {
        const newFormData = { ...formData };
        if (field === 'available' || field === 'additional') {
            newFormData.itinerary[itineraryIndex].activities[0][activityIndex][field] = value;
        } else {
            newFormData.itinerary[itineraryIndex].activities[0][activityIndex][field] = value;
        }
        setFormData(newFormData);
    };

    const handleAddActivity = (itineraryIndex) => {
        const newFormData = { ...formData };
        newFormData.itinerary[itineraryIndex].activities[0].push({
            activity: "",
            available: true,
            additional: true
        });
        setFormData(newFormData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')
        console.log(formData);
        const res = await axios.post("http://103.189.172.172:3000/custom/service", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        if (res.status === 200) {
            alert("Bid service added successfully");
        } else {
            alert("Failed to add bid service");
        }
        navigate("/dashboard")
    };

    return (
        <div className="container mt-5 mb-5">
            <h1 className="mb-4 text-center">Create Custom Bid Service</h1>
            <CForm className="p-4 rounded shadow-sm">
                <div className="mb-5">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '45%' }}>
                            <label htmlFor="start_date" className="form-label" style={{ marginRight: '15px' }}>Start Date</label>
                            <DatePicker
                                id="start_date"
                                selectsStart
                                selected={formData.start_date}
                                onChange={(date) => {
                                    setStartDate(date)
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        start_date: date
                                    }))
                                }}
                                autoComplete="off"
                                startDate={formData.start_date}
                                className="form-control"
                            />
                        </div>
                        <div style={{ width: '45%' }}>
                            <label htmlFor="end_date" className="form-label" style={{ marginRight: '15px' }}>End Date</label>
                            <DatePicker
                                id="end_date"
                                selectsEnd
                                selected={formData.end_date}
                                onChange={(date) => {
                                    setEndDate(date)
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        end_date: date
                                    }))
                                }}
                                endDate={formData.end_date}
                                startDate={formData.start_date}
                                minDate={formData.start_date}
                                autoComplete="off"
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <label htmlFor="name" className="form-label">Service Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Service Name"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="form-control"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="price" className="form-label">Total Price</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        name="price"
                        value={formData.price}
                        placeholder="Price"
                        pattern="[0-9]*"
                        className="form-control"
                    />
                </div>
                <div className="mb-5">
                    <h5>Itinerary</h5>
                    {formData.itinerary.map((item, index) => (
                        <div key={index}>
                            <h6>Destination: {item.destination}</h6>
                            <ul className="list-unstyled">
                                {item.activities[0].map((activity, activityIndex) => (
                                    <li key={activityIndex} className="d-flex align-items-center">
                                        <input
                                            type="text"
                                            value={activity.activity}
                                            onChange={(e) => handleActivityChange(index, activityIndex, 'activity', e.target.value)}
                                            className="form-control mx-4 w-25 my-2"
                                        />
                                        <input
                                            type="checkbox"
                                            checked={activity.available}
                                            onChange={(e) => handleActivityChange(index, activityIndex, 'available', e.target.checked)}
                                            className="form-check-input mr-2"
                                        />
                                        <label className="form-check-label mr-2">Available</label>
                                    </li>
                                ))}
                                <button type='button' onClick={() => handleAddActivity(index)} className="btn btn-secondary mt-2 mx-4">Add Activity</button>
                            </ul>
                        </div>
                    ))}
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </CForm>
        </div>
    )
}

export default AddCustomService