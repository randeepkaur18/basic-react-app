import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({ error: true })
        //     })
    }

    updatePurchasableState = (updatedIngredients) => {
        const sum = Object.values(updatedIngredients)
            .reduce((sum, item) => {
                return sum + item;
            }, 0);
        return sum > 0;
    }

    updatePurchasingForOrder = () => {
        this.setState({ purchasing: true });
    }

    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false });
    }

    continuePurchaseHandler = () => {
        this.props.history.push('/checkout');
    }

    render(props) {
        const disabledInfo = { ...this.props.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let ordersummary = null;
        let burger = this.state.error ? <p>Sorry! Ingredients are not loaded.</p> : <Spinner />;
        if (this.props.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        addIngredient={this.props.onAddIngredient}
                        removeIngredient={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchasableState(this.props.ingredients)}
                        order={this.updatePurchasingForOrder} />
                </React.Fragment>
            );
            ordersummary = <OrderSummary
                cancelPurchase={this.cancelPurchaseHandler}
                continuePurchase={this.continuePurchaseHandler}
                ingredients={this.props.ingredients}
                price={this.props.totalPrice} />
        }
        if (this.state.loading) {
            ordersummary = <Spinner />
        }

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing}
                    modalClosed={this.cancelPurchaseHandler} >
                    {ordersummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    };
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingName: ingName
        }),
        onRemoveIngredient: (ingName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingName: ingName
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));