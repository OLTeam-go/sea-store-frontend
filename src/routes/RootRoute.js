import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LandingPage from "../pages/LandingPage"
import ProfilePage from "../pages/ProfilePage"
import OrderPage from "../pages/OrderPage"
import CartPage from "../pages/CartPage"
import HomePage from "../pages/HomePage"

export default class RootRoute extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="/order" component={OrderPage} />
                    <Route path="/cart" component={CartPage} />
                    <Route path="/" component={LandingPage} />
                </Switch>
            </Router>
        )
    }
}