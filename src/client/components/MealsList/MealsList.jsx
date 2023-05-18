import React, { useState, useEffect } from 'react';
import "./MealsList.css";
import Meal from './Meal/Meal';

function MealsList() {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3005/all-meals')
            .then(response => response.json())
            .then(data => setMeals(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Our Menu</h1>
            <div className='meals-container'>
                {meals.map(meal => {
                    return <Meal
                        key={meal.id}
                        title={meal.title}
                        description={meal.description}
                        price={meal.price}
                    />
                })}
            </div>
        </div>
    );
}

export default MealsList;
