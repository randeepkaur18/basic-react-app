import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            quantity: props.ingredients[ingredientName] 
        })
    }

    const ingredientsOutput = ingredients.map(ingredient => {
        return (
        <span key={ingredient.name} className={classes.Ingredients}>
            {ingredient.name} ({ingredient.quantity})
        </span>
        )
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>$ {props.price}</strong></p>
        </div>
    );
}

export default order;