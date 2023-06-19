/* eslint-disable react/prop-types */
import React from 'react';
import "./Meal.css";

function Meal(props) {
    
    return (
        <div key={props.id} className='meal'>
            <div className='meal-description'>

                <div className='meal-image'>
                    <img src={props.imageURL} alt={props.title} />
                </div>
                <div>
                    <h4>{props.title}</h4>
                    <p>Location: {props.location}</p>
                    <p>Price: ${props.price}</p>
                </div>
            </div>
        </div>
    )
}

export default Meal;
