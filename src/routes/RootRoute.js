import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LandingPage from "../pages/LandingPage"

export default class RootRoute extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" component={LandingPage} />
                </Switch>
            </Router>
        )
    }
}