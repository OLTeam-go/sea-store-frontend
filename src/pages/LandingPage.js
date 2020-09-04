import React, { Component } from "react"
import { Layout, Button } from "antd"
import { Redirect } from "react-router-dom"

import "antd/dist/antd.css"
import "./styles/landing_page.css"
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import Overlay from "../components/Overlay"
import AuthSession from "../services/AuthSession"

const { Content } = Layout

class LandingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formHidden: true,
            loginFormHidden: true,
            registerFormHidden: true
        }
    }

    handleOverlayClick = () => {
        this.setState({
            formHidden: true,
            loginFormHidden: true,
            registerFormHidden: true
        })
    }

    handleLoginButtonClick = () => {
        this.setState({
            formHidden: !this.state.formHidden,
            loginFormHidden: !this.state.loginFormHidden,
            registerFormHidden: true
        })
    }

    handleRegisterButtonClick = () => {
        this.setState({
            formHidden: !this.state.formHidden,
            loginFormHidden: true,
            registerFormHidden: false
        })
    }

    render() {
        return (
            AuthSession.handleIsLoggedIn()
                ? <Redirect to={`${AuthSession.getUserType()}/home`} />
                : (
                    <Layout className="landing-page">
                        <Content className="landing-page__introduction-content">
                            <h1 className="landing-page__introduction-content--heading">Marketplace</h1>
                            <p className="landing-page__introduction-content--paragraph">Your simplest and cheapest marketplace to ever exist</p>
                            <Button 
                                className="landing-page__introduction-content--register"
                                onClick={() => this.handleRegisterButtonClick()}
                            >
                                Register
                            </Button>
                            <Button 
                                className="landing-page__introduction-content--login" 
                                onClick={() => this.handleLoginButtonClick()}
                            >
                                Login
                            </Button>
                        </Content>

                        <Overlay 
                            className={this.state.formHidden ? "overlay--hide" : "overlay"} 
                            onClick={() => this.handleOverlayClick()}
                        />
                        
                        <LoginForm 
                            className={"form--login" + (this.state.loginFormHidden ? " form--hide" : "")}
                            onFinish={() => this.handleLoginFormSubmission()} 
                        />

                        <RegisterForm
                            className={"form--register" + (this.state.registerFormHidden ? " form--hide" : "")}
                        />
                    </Layout>
                )
        )
    }
}

export default LandingPage