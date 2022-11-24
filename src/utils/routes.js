import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Router as BrowserRouter /*, Redirect, Switch, Route*/
} from "react-router-dom";
import { renderRoutes } from "react-router-config";
import ScrollToTop from "../components/scrollToTop";

// import PrivateRoute from './privateRoute';
// import Login from '../containers/login';
import Error404 from "../containers/404";
import Homepage from "../containers/home";
// import ComingSoon from '../containers/comingSoon';
// import { isUserLoggedIn } from './auth';

import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const routes = [
  {
    path: "/solutions",
    exact: true,
    component: () => <Homepage />
  },
  // {
  //     path: '/login',
  //     component: () => <Login />,
  // },
  // {
  //     component: () => (isUserLoggedIn() ? <ComingSoon /> : <Redirect to="/login" />),
  //     path: '/upload',
  // },
  {
    component: () => <Error404 />,
    path: "/*"
  }
];

class Routes extends Component {
  render() {
    return (
      <BrowserRouter history={history}>
        <ScrollToTop>{renderRoutes(routes)}</ScrollToTop>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Routes);
