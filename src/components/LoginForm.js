import React, { Component } from "react"
import { Form, Input, Button, Spin, notification } from "antd"
import PropTypes from "prop-types"
import { withRouter } from "react-router"

import AuthApi from "../apis/AuthApi"
import AuthSession from "../services/AuthSession"
import "./styles/login_register_form.css"

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16
    }
}

class LoginForm extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }

    handleLoginRequest(value) {
        this.setState({ isLoading: true })
        AuthApi.handleLogin({
            username: value.username,
            password: value.password
        }).then(res => {
            this.setState({ isLoading: false })
            const { type, username, id } = res.data
            AuthSession.handleLoginSucceeded({ type, username, id })
            this.props.history.push(`/${type}/home`)
        }).catch(err => {
            this.setState({ isLoading: false })
            notification.error({
                message: "Error logging in",
                description: "There was an error in logging in",
                duration: 2.5
            })
            console.log(err)
        })
    }

    render() {
        return (
            <Form 
                {...layout}
                className={this.props.className}
                onFinish={(value) => this.handleLoginRequest(value)}
            >
                <h1>Login</h1>

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username"
                        }
                    ]}
                >
                    <Input />    
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password"
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                {
                    this.state.isLoading
                        ? <Spin />
                        : (
                            <Form.Item>
                            <Button 
                                    type="primary"
                                    htmlType="submit"
                                    className="form__submit"
                                >
                                    Login
                                </Button>
                            </Form.Item>
                        )
                }
            </Form>
        )
    }
}

export default withRouter(LoginForm)