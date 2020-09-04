import React, { Component } from "react"
import { Layout, Menu } from "antd"
import PropTypes from "prop-types"
import { withRouter } from "react-router"

import "./styles/header_component.css"

const { Header } = Layout

class HeaderComponent extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    }

    handleHomeMenuClick() {
        console.log("Home menu clicked")
        this.props.history.push("/customer/home")
    }

    handleProfileMenuClick() {
        console.log("Profile menu clicked")
        this.props.history.push("/customer/profile")
    }

    handleOrderMenuClick() {
        console.log("Order menu clicked")
        this.props.history.push("/customer/order")
    }

    handleCartMenuClick() {
        console.log("Cart menu clicked")
        this.props.history.push("/customer/cart")
    }

    render() {
        return (
            <Header>
                <div className="logo" />
    
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[`${this.props.defaultSelectedKeys}`]}>
                    <Menu.Item 
                        key="1"
                        onClick={() => this.handleHomeMenuClick()}
                    >
                        Home
                    </Menu.Item>
                    <Menu.Item 
                        key="2"
                        onClick={() => this.handleProfileMenuClick()}
                    >
                        Profile
                    </Menu.Item>
                    <Menu.Item 
                        key="3"
                        onClick={() => this.handleOrderMenuClick()}
                    >
                        Order
                    </Menu.Item>
                    <Menu.Item 
                        key="4" 
                        className="menu__item--last-child"
                        onClick={() => this.handleCartMenuClick()}
                    >
                        <img src={process.env.PUBLIC_URL + "/images/cart.png"} alt="Cart" />
                    </Menu.Item>
                </Menu>
            </Header>
        )
    }
}

export default withRouter(HeaderComponent)