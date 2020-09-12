import React, { Component } from "react"
import { Layout, Menu, Popconfirm, message } from "antd"
import PropTypes from "prop-types"
import { withRouter } from "react-router"

import AuthSession from "../../services/AuthSession"
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

    handleTransactionMenuClick() {
        this.props.history.push("/customer/transaction")
    }

    handleCartMenuClick() {
        console.log("Cart menu clicked")
        this.props.history.push("/customer/cart")
    }

    handleLogout() {
        message.info("Logged out")
        AuthSession.handleLogout()
        this.props.history.push("/")
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
                        onClick={() => this.handleTransactionMenuClick()}
                    >
                        Transaction
                    </Menu.Item>

                    <Menu.Item 
                        key="4" 
                        className="menu__item--right-margined"
                        onClick={() => this.handleCartMenuClick()}
                    >
                        <img className="menu__item--image" src={process.env.PUBLIC_URL + "/images/cart.png"} alt="Cart" />
                    </Menu.Item>

                    <div className="menu__item--not-selectable">
                        <Popconfirm 
                            placement="bottomRight"
                            title="Are you sure you want to logout?"
                            onConfirm={() => this.handleLogout()}
                            okText="Yes"
                            cancelText="No"
                        >
                            <div>
                                <img src={process.env.PUBLIC_URL + "/images/logout.png"} alt="Logout" />
                            </div>
                        </Popconfirm>
                    </div>
                </Menu>
            </Header>
        )
    }
}

export default withRouter(HeaderComponent)