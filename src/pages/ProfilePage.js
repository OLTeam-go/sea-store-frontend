import React, { Component } from "react"
import { Layout } from "antd"
import { withRouter } from "react-router-dom"

import HeaderComponent from "../components/HeaderComponent"
import ProfileUpdateForm from "../components/ProfileUpdateForm"

const { Content } = Layout

class ProfilePage extends Component {
    handleHomeMenuClick() {
        console.log("Home menu clicked")
        this.props.history.push("/home")
    }

    handleProfileMenuClick() {
        console.log("Profile menu clicked")
        this.props.history.push("/profile")
    }

    handleOrderMenuClick() {
        console.log("Order menu clicked")
        this.props.history.push("/order")
    }

    handleCartMenuClick() {
        console.log("Cart menu clicked")
        this.props.history.push("/cart")
    }

    render() {
        return (
            <Layout>
                <HeaderComponent defaultSelectedKeys={2} />
                <Content>
                    <ProfileUpdateForm />
                </Content>
            </Layout>
        )
    }
}

export default withRouter(ProfilePage)