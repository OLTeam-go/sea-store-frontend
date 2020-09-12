import React, { Component } from "react"
import { Layout, Table } from "antd"

import HeaderComponent from "../../components/merchant/HeaderComponent"
import TransactionApi from "../../apis/TransactionApi"
import AuthSession from "../../services/AuthSession"
import Formatter from "../../utilities/Formatter"

const { Content } = Layout

export default class RequestPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            requestData: []
        }
    }

    componentDidMount() {
        this.handleGetRequestData()
    }

    handleGetRequestData() {
        const merchantId = AuthSession.getUserId()
        TransactionApi.handleGetMerchantRequest(merchantId)
            .then(res => {
                if (!res.data.data) return Promise.resolve([])
                const newRequestData = res.data.data
                this.setState({
                    isLoading: false,
                    requestData: newRequestData
                })
            })
            .catch(err => {
                console.error(err)
            })
    }

    render() {
        const requestColumns = [
            {
                title: "Order Date",
                dataIndex: "update_at",
                render: (text) => Formatter.formatDate(text)
            },
            {
                title: "Product",
                dataIndex: "name",
                key: "name"
            },
            {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity"
            },
            {
                title: "Transferred",
                dataIndex: "price",
                render: (text) => Formatter.formatCurrency(text)
            }
        ]

        return (
            <Layout>
                <HeaderComponent defaultSelectedKeys={4} />
                <Content>
                    <h1>Order Requested</h1>
                    <Table 
                        columns={requestColumns} 
                        dataSource={this.state.requestData} 
                        loading={this.state.isLoading}
                        rowKey="id"
                    />
                </Content>
            </Layout>
        )
    }
}