import React, { Component } from "react"
import { Layout, Button } from "antd"

import "antd/dist/antd.css"
import "./styles/landing_page_style.css"

const { Header, Footer, Sider, Content } = Layout

export default class LandingPage extends Component {
    render() {
        return (
            <Layout className="landing-page">
                <Content className="landing-page__introduction-content">
                    <h1 className="landing-page__introduction-content--heading">Marketplace</h1>
                    <p className="landing-page__introduction-content--paragraph">Your simplest and cheapest marketplace to ever exist</p>
                    <Button className="landing-page__introduction-content--register ">Register</Button>
                    <Button className="landing-page__introduction-content--login">Login</Button>
                </Content>
            </Layout>
        )
    }
}