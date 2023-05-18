/* eslint-disable react/prop-types */
import React from 'react';
import "./Meal.css";

function Meal(props) {
    return (
        <div key={props.id} className='meal'>
            <div className='meal-description'>
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>
            <div className='meal-price'>
                ${props.price}
            </div>
        </div>
    )
}

export default Meal;
