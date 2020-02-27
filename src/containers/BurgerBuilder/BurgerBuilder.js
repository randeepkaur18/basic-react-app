import React, { Component } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchasableState = updatedIngredients => {
    const sum = Object.values(updatedIngredients).reduce((sum, item) => {
      return sum + item;
    }, 0);
    return sum > 0;
  };

  updatePurchasingForOrder = () => {
    if (this.props.isAuthenticated) this.setState({ purchasing: true });
    else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  continuePurchaseHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render(props) {
    const disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let ordersummary = null;
    let burger = this.props.error ? (
      <p>Sorry! Ingredients are not loaded.</p>
    ) : (
      <Spinner />
    );
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
            order={this.updatePurchasingForOrder}
            isAuth={this.props.isAuthenticated}
          />
        </React.Fragment>
      );
      ordersummary = (
        <OrderSummary
          cancelPurchase={this.cancelPurchaseHandler}
          continuePurchase={this.continuePurchaseHandler}
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
        />
      );
    }
    // We don't need it any more, bcz we are not handling it async
    //
    // if (this.state.loading) {
    //     ordersummary = <Spinner />
    // }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.cancelPurchaseHandler}
        >
          {ordersummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ingName => dispatch(actions.addIngredient(ingName)),
    onRemoveIngredient: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
