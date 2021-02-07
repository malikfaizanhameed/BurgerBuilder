import React, { useState, useEffect } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {
  const [state, setState] = useState({
    ingredients: {
      salad: 1,
      bacon: 1,
      meat: 1,
      cheese: 1,
    },
  });

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    setState({ ingredients: ingredients });
  }, []);

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  return (
    <div>
      <CheckoutSummary
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
        ingredients={state.ingredients}
      />
      <Route
        path={props.match.path + "/contact-data"}
        component={ContactData}
      />
    </div>
  );
};

export default Checkout;
