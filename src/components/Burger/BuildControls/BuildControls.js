import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price}</strong>
      </p>
      {controls.map(item => (
        <BuildControl
          label={item.label}
          key={item.label}
          add={() => {
            props.addIngredient(item.type);
          }}
          remove={() => {
            props.removeIngredient(item.type);
          }}
          disabled={props.disabled[item.type]}
        />
      ))}
      <button
        disabled={!props.purchasable}
        className={classes.OrderButton}
        onClick={props.order}
      >
        {props.isAuth ? "ORDER NOW" : "SIGNUP TO ORDER"}
      </button>
    </div>
  );
};

export default buildControls;
