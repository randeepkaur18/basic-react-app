import React from 'react';
import Button from '../../../UI/Button/Button';

const orderSummary = (props) => {
    const orderSummary = props.ingredients;
    const list = Object.keys(orderSummary).map((key) => (
            <li key={key}>
                <span style={{textTransform: 'capitalize'}}>{key}:</span> {orderSummary[key]} 
            </li>
        )
    );
    return (
        <div>
            <h3>Your Order</h3>
            <ul>{list}</ul>
            <p><strong>Total Price : {props.price}</strong></p>
            <p>Continue to Checkout ?</p>
            <Button btnType="Danger" clicked={props.cancelPurchase}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continuePurchase}>CONTINUE</Button>        
        </div>
    );
}

export default orderSummary;