import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const ingredient_prices = {
    salad: 2,
    cheese: 5,
    bacon: 3,
    meat: 7
};
class BurgerBuilder extends Component {
    state = {
        // ingredients: {
        //     salad: 0,
        //     cheese: 0,
        //     bacon: 0,
        //     meat: 0
        // },
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                console.log(error);
            })

    }

    updatePurchasableState = (updatedIngredients) => {
        const sum = Object.values(updatedIngredients)
            .reduce((sum, item) => {
                return sum + item;
            }, 0);
        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: this.state.totalPrice + ingredient_prices[type]
        });
        this.updatePurchasableState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const updatedIngredients = { ...this.state.ingredients };
        if (this.state.ingredients[type] <= 0) {
            return;
        }
        updatedIngredients[type] = this.state.ingredients[type] - 1;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: this.state.totalPrice - ingredient_prices[type]
        });
        this.updatePurchasableState(updatedIngredients);
    }

    updatePurchasingForOrder = () => {
        this.setState({ purchasing: true });
    }

    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false });
    }

    continuePurchaseHandler = () => {
        //alert('Continue');
        this.setState({ loading: true });
        let orderData = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Randeep',
                address: {
                    street: 'Electronic City',
                    zipcode: '560100'
                },
                email: 'randeep@test.com'
            }
        }
        axios.post('/orders.json')
            .then(response => {
                this.setState({ loading: false, purchasing: false })
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false })
            })
    }

    render(props) {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let ordersummary = null;
        let burger = null;
        if (this.state.ingredients) {
            burger = <React.Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    order={this.updatePurchasingForOrder} />
            </React.Fragment>
            ordersummary = <OrderSummary
                cancelPurchase={this.cancelPurchaseHandler}
                continuePurchase={this.continuePurchaseHandler}
                ingredients={this.state.ingredients}
                price={this.state.totalPrice} />
        }
        if (this.state.loading) {
            ordersummary = null;
        }

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler} >
                    {ordersummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    };
}

export default BurgerBuilder;