import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice: 0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = null;
        for (let param of query.entries()) {
            if(param[0] === 'price') {
                totalPrice = param[1];
            }
            else {
                ingredients[param[0]] = Number(param[1]);
            }
        }
        this.setState({ ingredients, totalPrice });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.path + "/contact-data"}
                    render={() => <ContactData 
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice} />}
                />
            </div>
        );
    }
}

export default Checkout;