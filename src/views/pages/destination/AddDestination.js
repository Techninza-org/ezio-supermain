import React, { useState } from 'react';
import { AppSidebar, AppHeader } from '../../../components/index';
import { CForm } from '@coreui/react';
import axios from 'axios';

const AddDestination = () => {
    const [predictions, setPredictions] = useState([]);
    const [fetchPredictions, setFetchPredictions] = useState(false);


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
        image: ''
    });

    const handleAddressChange = async (e) => {
        const address = e.target.value;
        setFormData({ ...formData, destination: address });
        if (address !== '') {
            setFetchPredictions(true);
            const predictions = await axios.get(`${import.meta.env.VITE_BASE_URL}destination/search/destination?address=${address}`);
            setPredictions(predictions.data.predictions);
        } else {
            setFetchPredictions(false);
            setPredictions([]);
        }
    };

    const handlePredictionSelect = async (description) => {
        try {
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${description}&key=${import.meta.env.VITE_MAPS_API_KEY}`;
            const response = await axios.get(geocodeUrl);
            if (response.data.status === 'OK') {
                const location = response.data.results[0].geometry.location;
                setFormData({
                    ...formData,
                    latitude: location.lat,
                    longitude: location.lng,
                    destination: description
                });
                setFetchPredictions(false);
                setPredictions([]);
            }
        } catch (error) {
            console.error('Error fetching geocode data: ', error);
        }
    };


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
        } else if (name === 'image') {
            const file = e.target.files[0];
            
            setFormData({
                ...formData,
                image: file
            })
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
        const formDataToSend = new FormData();
        formDataToSend.append("destination", formData.destination);
        formDataToSend.append("pincode", formData.pincode);
        formDataToSend.append("latitude", Number(formData.latitude));
        formDataToSend.append("longitude", Number(formData.longitude));
        formDataToSend.append("description", formData.description);
        formDataToSend.append("features", formData.features);
        formDataToSend.append("customise_options", formData.customise_options);
        formDataToSend.append("image", formData.image);

        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}destination`, formDataToSend, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
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
                                value={formData.destination}
                                onChange={handleAddressChange}
                            />
                            {fetchPredictions && (
                                <ul className="list-group">
                                    {predictions?.map((prediction) => (
                                        <li
                                            key={prediction.place_id}
                                            className="list-group-item list-group-item-action"
                                            onClick={() => handlePredictionSelect(prediction.description)}
                                        >
                                            {prediction.description}
                                        </li>
                                    ))}
                                </ul>
                            )}
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
                        {/* <div className="mb-3">
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
                        </div> */}
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
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Image</label>
                            <input
                                type="file"
                                name="image"
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
        </>
    )
}

export default AddDestination;
