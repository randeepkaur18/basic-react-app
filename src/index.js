import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import * as serviceWorker from "./serviceWorker";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";

import "./index.css";
import App from "./App";

// const composeEnhancers = window._
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

// creating a middleware
/*
  const logger = store => {
    return next => {
      return action => {
        console.log("[Logger Middleware] dispatching", action);
        const result = next(action);
        // this will now let the action continueto the reducer,
        // we need to pass action as an argument
        console.log("[Logger Middleware] next state", store.getState());
        return result;
      };
    };
  };
*/

/*
  So the above function tree for creating middleware is in the end what gets executed,
  all of that is done by redux, we don't have to call any of these functions,
  all we have to do is apply this middleware to our store.
*/

/*
  combineReducers => combines reducers
  compose => combines enhancers
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ => is a Chrome Extension
  into our javascript at runtime so it will be available.

  In case that extension can't be found, we'll fall back to a default compose
  function provided by redux.
*/

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/*
  The second argument to `createStore` here can be a so-called enhancer.
  Now this enhancer is nothing else than a middleware
  You can pass a list of middlewares here to applyMiddleware,
  like: applyMiddleware(logger, thunk)
  They will be executed in order then.
*/

// Middleware runs between runs between the dispatching of an action and the point of
// time the action reaches the reducer.
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

/*
  Generally, this is a library which as I just said adds a middleware to your project
  which allows your actions to not or your action creators to be precise to not return
  the action itself but return a function which will eventually dispatch an action.
*/

const app = (
  // `Provider` should wrap everything, that's why it should include `BrowserRouter`
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
