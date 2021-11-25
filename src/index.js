import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Redirect } from "react-router";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./index.css";
import App from "./App";
import SearchProductPage from "./pages/SearchProductPage";
import DetailProductPage from "./pages/DetailProductPage";
import ProfileAccountPage from "./pages/ProfileAccountPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import reportWebVitals from "./reportWebVitals";
// import MotelInfor from "./pages/motel/components/MotelInfor.js";
// import Dashboard from "./pages/dashboard/Dashboard";
// import Login from "./pages/login/Login";
// import Register from "./pages/login/Register";
import store from "./redux/store";
import * as serviceWorker from "./serviceWorker";

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Switch>
            <Route extract path="/home" component={App} />
            <Route extract path="/account/profile" component={ProfileAccountPage} />
            <Route extract path="/login" component={LoginPage} />
            <Route extract path="/search" component={SearchProductPage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/category/:id" component={SearchProductPage} />
            <Route path="/detail/:link/:id" component={DetailProductPage} />
            {/* <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/detail/:id" component={MotelInfor} /> */}

            {/* <Route path="/*" component={PageNotFound} /> */}
            <Redirect to="/home">
              <App />
            </Redirect>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

reportWebVitals();
