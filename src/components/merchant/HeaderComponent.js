import React, { Component } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router"
import { Layout, Menu, Popconfirm, message } from "antd"

import AuthSession from "../../services/AuthSession"

const { Header } = Layout

class HeaderComponent extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    }

    handleHomeMenuClick() {
        this.props.history.push("/merchant/home")
    }

    handleProfileMenuClick() {
        this.props.history.push("/merchant/profile")
    }

    handleWalletMenuClick() {
        this.props.history.push("/merchant/wallet")
    }

    handleRequestMenuClick() {
        this.props.history.push("/merchant/request")
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
                        onClick={this.handleHomeMenuClick.bind(this)}
                    >
                        Home
                    </Menu.Item>
                    <Menu.Item 
                        key="2"
                        onClick={this.handleProfileMenuClick.bind(this)}
                    >
                        Profile
                    </Menu.Item>
                    <Menu.Item 
                        key="3"
                        onClick={this.handleWalletMenuClick.bind(this)}
                    >
                        Wallet
                    </Menu.Item>
                    <Menu.Item
                        key="4"
                        onClick={this.handleRequestMenuClick.bind(this)}
                    >
                        Request
                    </Menu.Item>

                    <div className="menu__item--right-margined menu__item--not-selectable">
                        <Popconfirm 
                            placement="bottomRight"
                            title="Are you sure you want to logout?"
                            onConfirm={() => this.handleLogout()}
                            okText="Yes"
                            cancelText="No"
                        >
                            <img src={process.env.PUBLIC_URL + "/images/logout.png"} alt="Logout" />
                        </Popconfirm>
                    </div>
                </Menu>
            </Header>
        )
    }
}

export default withRouter(HeaderComponent)