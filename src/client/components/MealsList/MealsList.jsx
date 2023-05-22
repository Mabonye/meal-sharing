import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./MealsList.css";
import Meal from './Meal/Meal';
import UseFetchData from '../UseFetchData/UseFetchData';

function MealsList() {
    const { data: meals, isLoading } = UseFetchData('http://localhost:3005/all-meals');
    const [expanded, setExpanded] = useState(false);
    const displayMeals = expanded ? meals : meals.slice(0, (meals.length / 2));

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='mealList'>

            <div className='meals-container'>
                {displayMeals.map(meal => {
                    return <Meal
                        key={meal.id}
                        title={meal.title}
                        location={meal.location}
                        price={meal.price}
                    />
                })}
            </div>

            {meals.length > displayMeals.length && (
                <Link to="/meals" className="display-button">
                    {expanded ? 'Show Less' : 'Show More'}
                </Link>
            )}
        </div>
    );
}

export default MealsList;

