import React, { Component } from "react"
import { Layout } from "antd"
import { withRouter } from "react-router-dom"

import HeaderComponent from "../components/HeaderComponent"

const { Content } = Layout

class CartPage extends Component {
    render() {
        return (
            <Layout>
                <HeaderComponent defaultSelectedKeys={4} />
                <Content>
                    
                </Content>
            </Layout>
        )
    }
}

export default withRouter(CartPage)