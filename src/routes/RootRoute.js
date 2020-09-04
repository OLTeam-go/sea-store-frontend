import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import LandingPage from "../pages/LandingPage"
import PrivateRoute from "./PrivateRoute"
import AuthSession from "../services/AuthSession"
import CustomerRoute from "./CustomerRoute"
import MerchantRoute from "./MerchantRoute"
import AdminRoute from "./AdminRoute"
import NotFoundRoute from "./NotFoundRoute"

export default class RootRoute extends Component {
    constructor(props) {
        super(props)
        this.state = {
            router: null
        }
    }

    componentDidMount() {
        const routeType = AuthSession.getUserType()
        let router = null
        if (routeType === "customer") router = CustomerRoute
        else if (routeType === "merchant") router = MerchantRoute
        else if (routeType === "admin") router = AdminRoute
        this.setState({
            router: router
        })
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    { CustomerRoute.map(props => <PrivateRoute {...props} key={props.path} />) }
                    { MerchantRoute.map(props => <PrivateRoute {...props} key={props.path} />) }
                    { AdminRoute.map(props => <PrivateRoute {...props} key={props.path} />) }
                    <Route component={NotFoundRoute} />
                </Switch>
            </Router>
        )
    }
}