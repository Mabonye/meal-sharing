/* eslint-disable react/prop-types */
import React from 'react';
import "./Meal.css";

function Meal(props) {
    return (
        <div key={props.id} className='meal'>
            <div className='meal-description'>
                <h4>{props.title}</h4>
                <p>Location: {props.location}</p>
                <p>Price: ${props.price}</p>
            </div>
        </div>
    )
}

export default Meal;
