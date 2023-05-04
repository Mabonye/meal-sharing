import React, { useState, useEffect } from 'react';
import "./MealItem.css";

function MealItem() {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3005/all-meals')
            .then(response => response.json())
            .then(data => setMeals(data))
            .catch(error => console.error(error));
    }, [meals]);

    return (
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
    )
}

export default MealItem;