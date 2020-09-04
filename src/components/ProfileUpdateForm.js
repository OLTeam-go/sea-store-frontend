import React, { Component } from "react"
import { Form, Input, Button, Radio, notification, Spin } from "antd"

import "./styles/profile_update_form.css"
import UserApi from "../apis/UserApi"

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
                username: "",
                name: "",
                gender: "",
                email: ""
            }
        }
    }

    componentDidMount() {
        this.getUserInfo()
    }

    getUserInfo() {
        const authedUser = JSON.parse(sessionStorage.getItem("authenticatedUser"))
        const userId = authedUser.id
        UserApi.handleGetUserInfo(userId)
            .then(res => {
                this.setState({
                    userInfo: {
                        username: res.data.username,
                        name: res.data.name,
                        gender: res.data.gender,
                        email: res.data.email
                    }
                })
                this.forceUpdate()
            }).catch(err => {
                console.log(err)
                notification.error({
                    message: "There was an error retrieving your data",
                    duration: 2
                })
            })
    }

    render() {
        return (
            this.state.userInfo.username === ""
                ? <Spin size="large" />
                : (
                    <Form 
                        {...layout}
                        className={this.props.className}
                        initialValues={{
                            "username": this.state.userInfo.username,
                            "name": this.state.userInfo.name,
                            "gender": this.state.userInfo.gender,
                            "email": this.state.userInfo.email
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
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email",
                                    type: "email"
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
                            <Button type="primary" htmlType="submit" className="form__submit">
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                )
        )
    }
}