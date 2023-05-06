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
            <ul>
                {meals.map(meal => {
                    return (
                        <li key={meal.id} className='meal'>
                            <h2>{meal.title}</h2>
                            <p>
                                <span>
                                    {meal.description}
                                </span>
                                <span className='meal-price'>
                                    ${meal.price}
                                </span>
                            </p>
                        </li>

                    )
                })}
            </ul>
        </div>
    );
}

export default MealsList;