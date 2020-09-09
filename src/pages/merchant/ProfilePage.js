import React, { Component } from "react"
import { Layout } from "antd"

import HeaderComponent from "../../components/merchant/HeaderComponent"
import ProfileUpdateForm from "../../components/ProfileUpdateForm"

const { Content } = Layout

export default class ProfilePage extends Component {
    render() {
        return(
            <Layout>
                <HeaderComponent defaultSelectedKeys={2} />
                <Content>
                    <ProfileUpdateForm />
                </Content>
            </Layout>
        )
    }
}