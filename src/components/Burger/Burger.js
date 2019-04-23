import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    let keys = Object.keys(props.ingredients);
    let array = [];
    let noOfIngredients = 0;
    let updatedIngredients = keys.map((key) => {
        if(props.ingredients[key] !== 0) {
            noOfIngredients += 1;
        }
        return [...Array(props.ingredients[key])].map((item, i) => <BurgerIngredient type={key} key={key + i} />);
    });
    if(noOfIngredients === 0) {
        updatedIngredients = <p>Please start adding ingredients !</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {updatedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;