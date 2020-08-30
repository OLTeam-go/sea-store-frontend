import React, { Component } from "react"
import { Form, Input, Button, Select, Radio } from "antd"

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

export default class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggingAsAdmin: false
        }
    }

    handleUserTypeChange(value) {
        console.log(value)
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
                className={this.props.className}>
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

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form__submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}