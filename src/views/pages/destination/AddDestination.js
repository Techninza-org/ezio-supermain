import React, { useState } from 'react';
import { AppSidebar, AppHeader } from '../../../components/index';
import axios from 'axios';
import { CForm } from '@coreui/react';

const AddDestination = () => {
    const [formData, setFormData] = useState({});
    const [predictions, setPredictions] = useState([]);
    const token = localStorage.getItem('token');

    const apiKey = 'AIzaSyAyu-6Pv7RaiohWH1bWpQqwXbx7roNG_GA';
    const autocompleteEndpoint = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

    async function autocompletePlaces(input) {
        try {
            const response = await axios.get(autocompleteEndpoint, {
                params: {
                    input: input,
                    key: apiKey,
                }
            });

            if (response.data.status === 'OK') {
                const predictions = response.data.predictions;
                setPredictions(predictions); // Update predictions state with fetched data
            } else {
                console.log(`Error: ${response.data.status}`);
            }
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Call autocomplete function whenever input changes
        autocompletePlaces(value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
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
                            <label htmlFor="name" className="form-label">Destination</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Destination Name"
                                className="form-control"
                                onChange={handleChange}
                            />
                        </div>
                        
                        {/* Display predictions as user types */}
                        <ul>
                            {predictions.map((prediction, index) => (
                                <li key={index}>{prediction.description}</li>
                            ))}
                        </ul>

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
