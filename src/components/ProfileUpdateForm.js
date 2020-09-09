import React, { Component } from "react"
import { Form, Input, Button, Radio, notification, Spin, message } from "antd"

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
            userInfo: { },
            isLoading: true
        }
    }

    componentDidMount() {
        this.getUserInfo()
    }

    getUserInfo() {
        const authedUser = JSON.parse(sessionStorage.getItem("authenticatedUser"))
        const userId = authedUser.id
        return UserApi.handleGetUserInfo(userId)
            .then(res => {
                this.setState({
                    userInfo: {
                        id: userId,
                        username: res.data.username,
                        name: res.data.name,
                        gender: res.data.gender.toLowerCase(),
                        email: res.data.email,
                        type: res.data.type,
                        active: res.data.active
                    }
                })
                this.setState({
                    isLoading: false
                })
            }).catch(err => {
                console.log(err)
                notification.error({
                    message: "There was an error retrieving your data",
                    duration: 2
                })
            })
    }

    handleUpdateRequest(value) {
        const newValue = {
            ID: this.state.userInfo.id,
            username: this.state.userInfo.username,
            email: value.email,
            password: value.password,
            name: value.name,
            gender: value.gender,
            type: this.state.userInfo.type,
            active: this.state.userInfo.active
        }
        
        this.setState({
            isLoading: true
        })
        UserApi.handleUpdateUserInfo(newValue)
            .then(res => {
                message.success("Profile updated")
                return this.getUserInfo()
            }).then(res => {
                this.setState({
                    isLoading: false
                })
            }).catch(err => {
                console.log(err)
                message.error("Profile failed to be updated")
            })
    }

    render() {
        return (
            this.state.isLoading
                ? <Spin size="large" />
                : (
                    <Form 
                        {...layout}
                        className={this.props.className}
                        initialValues={this.state.userInfo}
                        onFinish={(value) => this.handleUpdateRequest(value)}
                    >
                        <h1>Update Profile</h1>

                        <Form.Item
                            label="ID"
                            name="id"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your ID"
                                }
                            ]}
                        >
                            <Input disabled={true} />
                        </Form.Item>

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