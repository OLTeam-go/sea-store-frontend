import React, { Component } from "react"
import { Layout, Table } from "antd"
import HeaderComponent from "../../components/merchant/HeaderComponent"

import "./styles/wallet_page.css"
import WalletData from "../../components/merchant/WalletData"
import WalletApi from "../../apis/WalletApi"

const { Content } = Layout

export default class WalletPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        this.handleGetWalletData()
        WalletApi.handleGetWalletHistories()
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }

    handleGetWalletData() {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        })

        setTimeout(() => {
            this.setState({
                isLoading: false,
                walletData: [
                    {
                        date: "Mon 25 Sep 2020",
                        customer: "Michelle",
                        amountFormatted: formatter.format((150000).toFixed(0))
                    },
                    {
                        date: "Tue 26 Sep 2020",
                        customer: "Vincent",
                        amountFormatted: formatter.format((1000000).toFixed(0))
                    }
                ]
            })
        }, 2000)
    }

    render() {
        const walletColumns = [
            {
                title: "Date",
                dataIndex: "date",
                key: "date"
            },
            {
                title: "Customer",
                dataIndex: "customer",
                key: "customer"
            },
            {
                title: "Amount",
                dataIndex: "amountFormatted",
                key: "amountFormatted"
            }
        ]

        return (
            <Layout>
                <HeaderComponent defaultSelectedKeys={3} />
                <Content>
                    <WalletData />
                    <Table 
                        className="wallet-page__table"
                        columns={walletColumns} 
                        dataSource={this.state.walletData} 
                        loading={this.state.isLoading}
                        rowKey="id"
                    />
                </Content>
            </Layout>
        )
    }
}