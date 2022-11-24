import React, { Fragment } from "react";

import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";

import configureStore from "./store";
import Routes from "./utils/routes";

const initialState = {
  auth: {
    isLoggedIn: false
  }
};

const store = configureStore(initialState); // You can also pass in an initialState here

const App = () => (
  <Fragment>
    <CssBaseline />
    <Provider store={store}>
      <Routes />
    </Provider>
  </Fragment>
);

export default App;
