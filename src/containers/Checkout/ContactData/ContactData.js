import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      number: "",
      email: "",
      house: "",
      street: "",
      postalCode: "",
      paymentMethod: "",
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      price: this.props.price,
      ingredients: this.props.ingredients,
      customer: this.state,
    };
    console.log(order);
    axios
      .post("/order", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({
          [name]: checked,
        })
      : this.setState({
          [name]: value,
        });
  }

  render() {
    let form = (
      <form>
        <label>Name: </label>
        <input
          className={classes.Input}
          type="text"
          name="name"
          value={this.state.name}
          placeholder="Enter name"
          onChange={this.handleChange}
        />
        <label>Contact Number: </label>
        <input
          className={classes.Input}
          type="text"
          name="number"
          value={this.state.number}
          placeholder="Enter number"
          onChange={this.handleChange}
        />
        <label>Email: </label>
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="example@example.com"
          onChange={this.handleChange}
        />
        <label>House #: </label>
        <input
          className={classes.Input}
          type="text"
          name="house"
          value={this.state.house}
          placeholder="Enter house number"
          onChange={this.handleChange}
        />
        <label>Street: </label>
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Enter street number"
          onChange={this.handleChange}
        />
        <label>Postal Code: </label>
        <input
          className={classes.Input}
          type="text"
          name="postalCode"
          placeholder="Enter postal code"
          onChange={this.handleChange}
        />
        <label>
          <input
            type="checkbox"
            name="paymentMethod"
            onChange={this.handleChange}
            checked={this.state.paymentMethod}
          />
          Payment via Cash?
        </label>
        <br />
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
