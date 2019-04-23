import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return (
        <div classname={classes.CheckoutSummary}>
            <h1>Your Burger :</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType="Danger"
                clicked>
                CANCEL
            </Button>
            <Button
                btnType="Success"
                clicked>
                CONTINUE
            </Button>
        </div>
    );
}

export default checkoutSummary;