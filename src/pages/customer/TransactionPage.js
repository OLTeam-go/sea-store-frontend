import React, { Component } from "react"
import { Layout, Table } from "antd"

import HeaderComponent from "../../components/customer/HeaderComponent"

const { Content } = Layout

export default class TransactionPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            transactionData: []
        }
    }

    componentDidMount() {
        this.handleGetWalletData()
    }

    handleGetWalletData() {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        })

        setTimeout(() => {
            this.setState({
                isLoading: false,
                transactionData: [
                    {
                        date: "Mon 25 Sep 2020",
                        product: "RAM",
                        merchant: "merchantsir",
                        quantity: 1,
                        totalFormatted: formatter.format((150000).toFixed(0))
                    },
                    {
                        date: "Tue 26 Sep 2020",
                        product: "Camera",
                        merchant: "merchantsir",
                        quantity: 1,
                        totalFormatted: formatter.format((1000000).toFixed(0))
                    }
                ]
            })
        }, 2000)
    }

    render() {
        const transactionColumns = [
            {
                title: "Date",
                dataIndex: "date",
                key: "date"
            },
            {
                title: "Product",
                dataIndex: "product",
                key: "product"
            },
            {
                title: "Merchant",
                dataIndex: "merchant",
                key: "merchant"
            },
            {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity"
            },
            {
                title: "Total",
                dataIndex: "totalFormatted",
                key: "totalFormatted"
            }
        ]

        return (
            <Layout>
                <HeaderComponent defaultSelectedKeys={4} />
                <Content>
                    <Table 
                        className="transaction-page__table"
                        columns={transactionColumns} 
                        dataSource={this.state.transactionData} 
                        loading={this.state.isLoading}
                        rowKey="id"
                    />
                </Content>
            </Layout>
        )
    }
}