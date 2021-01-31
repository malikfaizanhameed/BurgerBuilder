import React, { useState } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.4,
};

const BurgerBuilder = (props) => {
  const [state, setState] = useState({
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  });

  const purchaseHandler = () => {
    setState({ ...state, purchasing: true });
  };

  const purchaseCancelHandler = () => {
    setState({ ...state, purchasing: false });
  };
  const purchaseContinueHandler = () => {
    alert("You Continue!");
  };

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    if (sum > 0) {
      return true;
    }
  };

  const addIngredientHandler = (type) => {
    const oldCount = state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    if (updatePurchaseState(updatedIngredients)) {
      setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice,
        purchasable: true,
      });
    } else {
      setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice,
        purchasable: false,
      });
    }
  };

  const removeIngredientHandler = (type) => {
    const oldCount = state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    if (updatePurchaseState(updatedIngredients)) {
      setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice,
        purchasable: true,
      });
    } else {
      setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice,
        purchasable: false,
      });
    }
  };

  const disabledInfo = {
    ...state.ingredients,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  return (
    <Auxiliary>
      <Modal modalClosed={purchaseCancelHandler} show={state.purchasing}>
        <OrderSummary
          price={state.totalPrice}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
          ingredients={state.ingredients}
        />
      </Modal>
      <Burger ingredients={state.ingredients} />
      <BuildControls
        ordered={purchaseHandler}
        ingredientRemoved={removeIngredientHandler}
        ingredientAdded={addIngredientHandler}
        disabled={disabledInfo}
        price={state.totalPrice}
        purchasable={state.purchasable}
      />
    </Auxiliary>
  );
};

export default BurgerBuilder;
