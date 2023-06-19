/* eslint-disable react/prop-types */
import React from 'react';
import Meal from '../Meal/Meal';
import { Link } from 'react-router-dom';
import "./AllMeals.css";
import { imageArray } from '../../../App';

function AllMeals(props) {
    const { meals } = props;

    return (
        <div id='allMeals'>
            <h1>All Meals</h1>
            <div className='meals-container'>
                {meals.map(meal => {
                    const mealImage = imageArray.find(mealData => mealData.mealId === meal.id);

                    return (
                        <div key={meal.id} className="meal-border">
                            <Link to={`/meals/${meal.id}`} className="meal-link">
                                <Meal
                                    title={meal.title}
                                    location={meal.location}
                                    price={meal.price}
                                    imageURL={mealImage.mealUrl}
                                />
                            </Link>
                        </div>
                    );

                })}
            </div>

        </div>
    );

};

export default AllMeals;
