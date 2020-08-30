import React, { Component } from "react"
import { Form, Input, Button, Radio } from "antd"

import "./styles/profile_update_form.css"

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16
    }
}

export default class ProfileUpdateForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {
                username: "username",
                name: "name",
                gender: "female",
                type: "consumer"
            }
        }
    }

    render() {
        return (
            <Form 
                {...layout}
                className={this.props.className}
                initialValues={{
                    "username": this.state.userInfo.username,
                    "name": this.state.userInfo.name,
                    "gender": this.state.userInfo.gender
                }}
            >
                <h1>Update Profile</h1>

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
                    <Input disabled={true} />    
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
                            { label: "Male", value: "male" },
                            { label: "Female", value: "female" }
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
                        Update
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}