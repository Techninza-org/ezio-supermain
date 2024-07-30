import React, { useState } from 'react'
import { AppSidebar, AppHeader } from '../../../components/index'
import { CForm } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CreateVendor = () => {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    function handleChange(e) {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if(!formData.name || !formData.username || !formData.phone || !formData.password){
            alert('Please fill all fields')
            return
        }
        if(formData.phone.length !== 10){
            alert('Phone number must be 10 digits')
            return
        }
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}superAdmin/vendor`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(res.status === 400){
            alert('Not added')
            return
        }
        navigate('/vendors')
    }

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div className='mx-3'>
                        <h1 className='text-center mb-2'>New Vendor</h1>
                        <CForm className="p-4 rounded shadow-sm">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Vendor Name"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone (10 digits)"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="text"
                                    name="password"
                                    placeholder="Password"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                                Submit
                            </button>
                        </CForm>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateVendor