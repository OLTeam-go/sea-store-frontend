import React, { Component } from "react"
import { Form, Input, Button, Select, Radio, Spin, notification } from "antd"
import PropTypes from "prop-types"
import { withRouter } from "react-router"

import AuthApi from "../apis/AuthApi"
import AuthSession from "../services/AuthSession"
import "./styles/login_register_form.css"

const { Option } = Select
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16
    }
}

class RegisterForm extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            isLoggingAsAdmin: false,
            isLoading: false
        }
    }

    handleRegisterRequest(value) {
        this.setState({ isLoading: true })
        AuthApi.handleRegistration(value)
            .then(res => {
                this.setState({ isLoading: false })
                // Get data from db later for the userType and username
                const { type, username, id } = res.data
                AuthSession.handleLoginSucceeded({ type, username, id })
                this.props.history.push(`/${type}/home`)
            }).catch(err => {
                this.setState({ isLoading: false })
                notification.error({
                    message: "Error registering",
                    description: "There was an error in registering",
                    duration: 2.5
                })
                console.error(err)
            })
    }

    handleUserTypeChange(value) {
        if (value === "admin") this.setState({
            isLoggingAsAdmin: true
        }) 
        else this.setState({
            isLoggingAsAdmin: false
        })
    }

    render() {
        return (
            <Form 
                {...layout}
                className={this.props.className}
                onFinish={(value) => this.handleRegisterRequest(value)}
            >
                <h1>Register</h1>

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
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your correct email",
                            type: "email"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="User Type"
                    name="userType"
                    rules={[
                        {
                            required: true,
                            message: "Please choose your user type"
                        }
                    ]}
                >
                    <Select
                        placeholder="Select your user type"
                        onChange={(value) => this.handleUserTypeChange(value)}
                        allowClear
                    >
                        <Option value="admin">Admin</Option>
                        <Option value="merchant">Merchant</Option>
                        <Option value="customer">Customer</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your name"
                        }
                    ]}
                >
                    <Input />    
                </Form.Item>

                <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[
                        {
                            required: true,
                            message: "Please select your gender"
                        }
                    ]}
                >
                    <Radio.Group 
                        options={[
                            { label: "Male", value: "Male" },
                            { label: "Female", value: "Female" }
                        ]}
                    />
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

                <Form.Item
                    label="Token"
                    name="token"
                    rules={[
                        {
                            required: this.state.isLoggingAsAdmin,
                            message: "Please insert your admin token"
                        }
                    ]}
                    className={this.state.isLoggingAsAdmin ? "" : "hide"}
                >
                    <Input />
                </Form.Item>

                {
                    this.state.isLoading
                        ? <Spin />
                        : (
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="form__submit">
                                    Register
                                </Button>
                            </Form.Item>
                        )
                }
            </Form>
        )
    }
}

export default withRouter(RegisterForm)