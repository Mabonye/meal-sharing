import React, { useState, useEffect } from 'react';
import UseFetchData from '../UseFetchData/UseFetchData';
import "./Reviews.css";
import moment from 'moment';


function Reviews() {
    const { data: meals, isLoading } = UseFetchData('http://localhost:3005/api/reviews/');
    const [displayedReviews, setDisplayedReviews] = useState(5); // Initial number of reviews to display

    console.log(meals)

    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        stars: "",
        created_date: "",
        description: "",
        meal_id: meals ? meals.id : null
    });

    const getTimeAgo = (date) => {
        return moment(date).fromNow();
    };


    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    }

    const handleReviewSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3005/api/reviews`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // Update the reviews state with the response data
                showSuccessAlert();
                console.log('Form submitted successfully');
                setFormData({
                    title: "",
                    stars: "",
                    created_date: "",
                    description: "",
                    meal_id: meals ? meals.id : null
                });
                setReviews([...reviews, data]);
            })
            .catch(error => {
                console.error('Error submitting a form', error);
            });
    }

    const showSuccessAlert = () => {
        window.alert('Review submitted successfully!');
    }

    const handleMoreReviews = () => {
        setDisplayedReviews(prevCount => prevCount + 5); // Increase the number of displayed reviews by 5
    }


    useEffect(() => {
        setReviews(meals)
    }, [meals]);


    return (
        <>
            <div className='review-container'>
                <h1>Meals Reviews</h1>

                {reviews.length > 0 && reviews.slice(0, displayedReviews).map(review => (
                    <div key={review.id} className='meal-review'>
                        <div className="meal-title">
                            <h3>{review.title}</h3>
                            <div>
                                {[...Array(review.stars || 5)].map((_, index) => {
                                    return <span key={index} style={{ display: 'inline' }}>⭐ </span>;
                                })}
                            </div>

                        </div>
                        <p>{review.description}</p>
                        <p>{getTimeAgo(review.created_date)}</p>
                    </div>
                ))}

                <div>
                    {displayedReviews < reviews.length && (
                        <button className="display-button" onClick={handleMoreReviews}>Load More</button>
                    )}

                    {displayedReviews >= reviews.length && displayedReviews > 5 && (
                        <button className="display-button" onClick={() => setDisplayedReviews(5)}>Show Less</button>
                    )}
                </div>



                <div>
                    <h2>Post Review</h2>

                    <form onSubmit={handleReviewSubmit} id="review-form">
                        <label htmlFor="title"> Title </label><br />
                        <input
                            type="text"
                            id="title"
                            value={formData.title}
                            required
                            onChange={handleInputChange}
                        /><br />

                        <label htmlFor="stars">Stars</label><br />
                        <input
                            type="number"
                            min="1"
                            max="5"
                            id="stars"
                            value={formData.stars}
                            required
                            onChange={handleInputChange}
                        /><br />

                        <label htmlFor="created_date">Date</label><br />
                        <input
                            type="date"
                            id="created_date"
                            value={formData.created_date}
                            min={moment().format('YYYY-MM-DD')}
                            required
                            onChange={handleInputChange}
                        /><br />

                        <label htmlFor="description">Description</label><br />
                        <textarea
                            type="text"
                            rows={4}
                            id="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        /><br />

                        <div className='buttons'>
                            <button type="submit" id="submit-review">Submit Review</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Reviews;