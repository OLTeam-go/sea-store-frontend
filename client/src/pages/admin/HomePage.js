import React, { Component } from "react"
import { Layout } from "antd"

import HeaderComponent from "../../components/admin/HeaderComponent"
import MerchantApprovalList from "../../components/admin/MerchantApprovalList"
import TransactionApprovalList from "../../components/admin/TransactionApprovalList"
import "./styles/home_page.css"

const { Content } = Layout

export default class HomePage extends Component {
    render() {
        return (
            <Layout className="home-page">
                <HeaderComponent defaultSelectedKeys={1} />                
                <Content>
                    <MerchantApprovalList className="home-page__merchant-approval-list" />
                    <TransactionApprovalList />
                </Content>
            </Layout>
        )
    }
}