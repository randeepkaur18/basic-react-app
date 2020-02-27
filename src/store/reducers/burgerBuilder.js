import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 2,
  cheese: 5,
  bacon: 3,
  meat: 7
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingName]: state.ingredients[action.ingName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName],
    building: true
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIng = {
    [action.ingName]: state.ingredients[action.ingName] - 1
  };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const newState = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName],
    building: true
  };
  return updateObject(state, newState);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    // ingredients: action.ingredients,
    // OR
    // changing the order of ingredients manually:
    ingredients: {
      salad: action.ingredients.salad,
      cheese: action.ingredients.cheese,
      bacon: action.ingredients.bacon,
      meat: action.ingredients.meat
    },
    totalPrice: 0,
    error: false,
    building: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });

    default:
      return state;
  }
};

export default reducer;
