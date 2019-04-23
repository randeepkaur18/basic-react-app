import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentDidUpdate() {
        console.log('component did update - order Summary');
    }

    render() {
        const orderSummary = this.props.ingredients;
        const list = Object.keys(orderSummary).map((key) => (
            <li key={key}>
                <span style={{ textTransform: 'capitalize' }}>{key}:</span> {orderSummary[key]}
            </li>
        )
        );

        return (
            <div>
                <h3>Your Order</h3>
                <ul>{list}</ul>
                <p><strong>Total Price : {this.props.price}</strong></p>
                <p>Continue to Checkout ?</p>
                <Button btnType="Danger" clicked={this.props.cancelPurchase}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continuePurchase}>CONTINUE</Button>
            </div>
        );
    }
}


export default OrderSummary;