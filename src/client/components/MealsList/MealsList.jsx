import React, { useState, useEffect } from 'react';
import "./MealsList.css";

function MealsList() {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3005/all-meals')
            .then(response => response.json())
            .then(data => setMeals(data))
            .catch(error => console.error(error));
    }, [meals]);

    return (
        <div>
            <h1>Our Menu</h1>
            <div>
                {meals.map(meal => {
                    return (
                        <div key={meal.id} className='meal'>
                            <div className='meal-description'>
                                <h2>{meal.title}</h2>
                                <p>{meal.description}</p>
                            </div>
                            <div className='meal-price'>
                                ${meal.price}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default MealsList;