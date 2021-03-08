import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      price: this.props.price,
      ingredients: this.props.ingredients,
      customer: {
        name: "Haider",
        address: {
          street: "hamayun road",
          country: "Pakistan",
          zipCode: "44000",
        },
        email: "test@test.com",
      },
      paymentMethod: "cash",
    };
    axios
      .post("/order.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="your name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="your email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="your street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postalCode"
          placeholder="your p code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
