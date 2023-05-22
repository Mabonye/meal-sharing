import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment/moment';
import "./MealDetails.css";
import UseFetchData from '../../../UseFetchData/UseFetchData';
import Modal from 'react-modal';

function MealDetails() {
    const { id } = useParams();
    const { data: meals, isLoading } = UseFetchData(`http://localhost:3005/api/meals/${id}`);

    const [formData, setFormData] = useState({
        contact_phonenumber: "",
        contact_name: "",
        contact_email: "",
        number_of_guests: "",
        created_date: "",
        meal_id: id 
    });

    console.log(meals.id)
    console.log(formData)

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    }

    const handleReservationSubmit = (event) => {
        event.preventDefault();
        // Handle reservation submission logic here
        fetch(`http://localhost:3005/api/reservations`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Form submitted successfully');
                showSuccessAlert();
                setFormData({
                    contact_phonenumber: "",
                    contact_name: "",
                    contact_email: "",
                    number_of_guests: "",
                    created_date: "",
                    meal_id: meals ? meals.id : null
                });
            })
            .catch(error => {
                console.error('Error submitting a form', error);
            });
    }


    console.log(meals)
    
    const showSuccessAlert = () => {
        window.alert('The Reservation has been made!');
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='meal-details'>
                {meals !== null ? (
                    <div>
                        <h2>Title: {meals.title}</h2>
                        <p>ID: {meals.id}</p>
                        <p>Location: {meals.location}</p>
                        <p>Maximum reservation: {meals.max_reservations}</p>
                        <p>Description: {meals.description}</p>

                        <div>
                            <h2>Make a Reservation</h2>

                            <form onSubmit={handleReservationSubmit}>
                                <label htmlFor="contact_name"> Name </label><br />
                                <input
                                    type="text"
                                    id="contact_name"
                                    value={formData.contact_name}
                                    required
                                    onChange={handleInputChange}
                                /><br />

                                <label htmlFor="contact_phonenumber">Phone Number</label><br />
                                <input
                                    type="tel"
                                    id="contact_phonenumber"
                                    value={formData.contact_phonenumber}
                                    required
                                    onChange={handleInputChange}
                                /><br />

                                <label htmlFor="contact_email">Email</label><br />
                                <input
                                    type="email"
                                    id="contact_email"
                                    value={formData.contact_email}
                                    required
                                    onChange={handleInputChange}
                                /><br />

                                <label htmlFor="number_of_guests">Number of people</label><br />
                                <input
                                    type="number"
                                    min="1"
                                    max={meals.max_reservations}
                                    id="number_of_guests"
                                    value={formData.number_of_guests}
                                    onChange={handleInputChange}
                                /><br />

                                <label htmlFor="created_date">Date</label><br />
                                <input
                                    type="date"
                                    id="created_date"
                                    value={formData.created_date}
                                    min={moment().format('YYYY-MM-DD')}
                                    onChange={handleInputChange}
                                /><br />

                                <div className='buttons'>
                                    <button type="submit" id="submit-button">Submit Reservation</button>
                                    
                                </div>

                            </form>
                        </div>
                    </div>
                ) : (
                    <p>No meals found.</p>
                )}

            </div>

        </>
    )

}

export default MealDetails;