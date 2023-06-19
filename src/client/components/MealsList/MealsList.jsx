/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./MealsList.css";
import Meal from './Meal/Meal';
import { imageArray } from '../../App';

function MealsList(props) {
    const { meals } = props;
    const [expanded, setExpanded] = useState(false);
    const displayMeals = expanded ? meals : meals.slice(0, (meals.length / 2));

    return (
        <div className='mealList'>

            <div className='meals-container'>
                {displayMeals.map(meal => {
                   const mealImage = imageArray.find(mealData => mealData.mealId === meal.id);
                   

                    return <Meal
                        key={meal.id}
                        title={meal.title}
                        location={meal.location}
                        price={meal.price}
                        imageURL={mealImage.mealUrl}
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