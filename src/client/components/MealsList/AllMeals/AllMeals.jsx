import React from 'react';
import Meal from '../Meal/Meal';
import UseFetchData from '../../UseFetchData/UseFetchData';
import { Link } from 'react-router-dom';
import "./AllMeals.css"


function AllMeals() {
    const { data: meals, isLoading } = UseFetchData('http://localhost:3005/all-meals');

    if (isLoading) {
        return <div>Loading...</div>;
    }
    console.log(meals)

    return (
        <div id='allMeals'>
            <h1>All Meals</h1>
            <div className='meals-container'>
                {meals.map(meal => {
                    return (
                        <div key={meal.id} className="meal-border">
                            <Link to={`/meals/${meal.id}`} className="meal-link">
                                <Meal
                                    title={meal.title}
                                    location={meal.location}
                                    price={meal.price}
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
