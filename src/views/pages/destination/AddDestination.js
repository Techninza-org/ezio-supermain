import React, { useState } from 'react';
import { AppSidebar, AppHeader } from '../../../components/index';
import { CForm } from '@coreui/react';
import axios from 'axios';

const AddDestination = () => {
    const [formData, setFormData] = useState({
        destination: '',
        pincode: '',
        latitude: Number(''),
        longitude: Number(''),
        description: '',
        numberOfFeatures: '',
        features: [],
        numberOfCustomiseOptions: '',
        customise_options: [],
    });


    function handleChange(e) {
        const { name, value } = e.target;

        if (name.startsWith("feature")) {
            const featureIndex = parseInt(name.slice(7)) - 1;
            const updatedFeatures = [...formData.features];
            updatedFeatures[featureIndex] = value;
            setFormData((prevData) => ({
                ...prevData,
                features: updatedFeatures,
            }));
        } else if (name.startsWith("customise_options")) {
            const customiseIndex = parseInt(name.slice(17)) - 1;
            const updatedCustomiseOptions = [...formData.customise_options];
            updatedCustomiseOptions[customiseIndex] = value;
            setFormData((prevData) => ({
                ...prevData,
                customise_options: updatedCustomiseOptions,
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem('token')
        console.log(formData);
        const formDataToSend = new FormData();
        formDataToSend.append("destination", formData.destination);
        formDataToSend.append("pincode", formData.pincode);
        formDataToSend.append("latitude", Number(formData.latitude));
        formDataToSend.append("longitude", Number(formData.longitude));
        formDataToSend.append("description", formData.description);
        formDataToSend.append("features", formData.features);
        formDataToSend.append("customise_options", formData.customise_options);

        console.log(formDataToSend, 'to send');

        const res = await axios.post("http://103.189.172.172:3000/destination", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                // "Content-Type": "application/json",
            }
        })
        if (res.status === 200) {
            alert("Destination added successfully");
        } else {
            alert("Failed to add destination");
        }
        navigate("/service/all")
    };

    const renderFeatureInputs = () => {
        const { numberOfFeatures } = formData;
        const numOfFeatures = parseInt(numberOfFeatures) || 0;
        const inputs = [];
        for (let i = 1; i <= numOfFeatures; i++) {
            inputs.push(
                <div key={i} className="mb-3">
                    <label htmlFor={`Feature${i}`} className="form-label">Feature {i}</label>
                    <input
                        type="text"
                        name={`feature${i}`}
                        value={formData.features[i - 1] || ""}
                        onChange={handleChange}
                        className="form-control"
                        // placeholder={`Feature ${i}`}
                    />
                </div>
            );
        }
        return inputs;
    }

    const renderCustomiseOptionsInputs = () => {
        const { numberOfCustomiseOptions } = formData;
        const numOfCustomiseOptions = parseInt(numberOfCustomiseOptions) || 0;
        const inputs = [];
        for (let i = 1; i <= numOfCustomiseOptions; i++) {
            inputs.push(
                <div key={i} className="mb-3">
                    <label htmlFor={`customise_options${i}`} className="form-label">Customise Option {i}</label>
                    <input
                        type="text"
                        name={`customise_options${i}`}
                        value={formData.customise_options[i - 1] || ""}
                        onChange={handleChange}
                        className="form-control"
                        // placeholder={`Customise Option ${i}`}
                    />
                </div>
            );
        }
        return inputs;
    }


    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <h1 className='text-center mb-4'>Add Destination</h1>
                    <CForm className="p-4 rounded shadow-sm">
                        <div className="mb-3">
                            <label htmlFor="destination" className="form-label">Destination</label>
                            <input
                                type="text"
                                name="destination"
                                placeholder="Destination Name"
                                className="form-control"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                className="form-control"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Latitude</label>
                            <input
                                type="number"
                                name="latitude"
                                placeholder="Latitude"
                                className="form-control"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Longitude</label>
                            <input
                                type="number"
                                name="longitude"
                                placeholder="Longitude"
                                className="form-control"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Description</label>
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                className="form-control"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-5">
                            <h5>Features</h5>
                            <label htmlFor="numberOfPickups" className="form-label">Number of Features</label>
                            <input type="text" name="numberOfFeatures" value={formData.numberOfFeatures} onChange={handleChange} placeholder="Number of features" className="form-control mb-3" />
                            {renderFeatureInputs()}
                        </div>
                        <div className="mb-5">
                            <h5>Customise Options</h5>
                            <label htmlFor="numberOfPickups" className="form-label">Number of Customise Options</label>
                            <input type="text" name="numberOfCustomiseOptions" value={formData.numberOfCustomiseOptions} onChange={handleChange} placeholder="Number of customise options" className="form-control mb-3" />
                            {renderCustomiseOptionsInputs()}
                        </div>


                        <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                            Submit
                        </button>
                    </CForm>
                </div>
            </div>
        </>
    )
}

export default AddDestination;
