import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const ingredient_prices = {
    salad: 2,
    cheese: 5,
    bacon: 3,
    meat: 7
};
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice: 0,
        purchasable: false,
        purchasing: false
    }

    updatePurchasableState = (updatedIngredients) => {
        const sum = Object.values(updatedIngredients)
        .reduce((sum, item) => {
            return sum + item;
        }, 0);
        this.setState({ purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: this.state.totalPrice + ingredient_prices[type]
        });
        this.updatePurchasableState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const updatedIngredients = {...this.state.ingredients};
        if(this.state.ingredients[type] <= 0) {
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
        this.setState({purchasing: true});
    }

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false});
    }

    continuePurchaseHandler = () => {
        alert('Continue');
    }

    render(props) {
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler} >
                    <OrderSummary 
                        cancelPurchase={this.cancelPurchaseHandler}
                        continuePurchase={this.continuePurchaseHandler}
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    order={this.updatePurchasingForOrder} />
            </React.Fragment>
        );
    };       
}

export default BurgerBuilder;