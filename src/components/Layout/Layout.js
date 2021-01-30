import React, { useState } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [state, setState] = useState({ showSideDrawer: false });

  const sideDrawerClosedHandler = () => {
    setState({ showSideDrawer: false });
  };

  const sideDrawerToggleHandler = () => {
    setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  return (
    <Auxiliary>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer
        open={state.showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Auxiliary>
  );
};
export default Layout;
