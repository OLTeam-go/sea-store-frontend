import React, { Component } from "react"
import { Layout } from "antd"

import HeaderComponent from "../../components/customer/HeaderComponent"
import ProfileUpdateForm from "../../components/ProfileUpdateForm"

const { Content } = Layout

class ProfilePage extends Component {
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

export default ProfilePage