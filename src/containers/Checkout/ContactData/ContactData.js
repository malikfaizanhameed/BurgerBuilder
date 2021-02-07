import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
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
          <Button btnType="Success" />
        </form>
      </div>
    );
  }
}

export default ContactData;
