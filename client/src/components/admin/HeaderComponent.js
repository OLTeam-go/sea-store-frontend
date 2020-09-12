import React, { Component } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router"
import { message, Layout, Popconfirm, Menu } from "antd"

import AuthSession from "../../services/AuthSession"
import "./styles/header_component.css"

const { Header } = Layout

class HeaderComponent extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    }

    handleHomeMenuClick() {
        console.log("Home menu clicked")
        this.props.history.push("/admin/merchant")
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

                    <div className="menu__item--right-margined menu__item--not-selectable">
                        <Popconfirm 
                            placement="bottomLeft"
                            title="Are you sure you want to logout?"
                            onConfirm={() => this.handleLogout()}
                            okText="Yes"
                            cancelText="No"
                        >
                            <div className="">
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