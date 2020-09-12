import React, { Component } from "react"
import { Layout, Table } from "antd"
import HeaderComponent from "../../components/merchant/HeaderComponent"

import WalletData from "../../components/merchant/WalletData"
import WalletApi from "../../apis/WalletApi"
import AuthSession from "../../services/AuthSession"
import Formatter from "../../utilities/Formatter"

import "./styles/wallet_page.css"

const { Content } = Layout

export default class WalletPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoadingHistory: true,
            walletHistories: []
        }
    }

    componentDidMount() {
        this.handleGetWalletHistories()
    }

    handleGetWalletHistories() {
        const merchantId = AuthSession.getUserId()
        this.setState({
            isLoadingHistory: true
        })
        WalletApi.handleGetWalletHistories()
            .then(histories => {
                if (!histories.data) return Promise.resolve([])
                this.setState({
                    isLoadingHistory: false,
                    walletHistories: histories.data.filter(history => history.user_id === merchantId)
                })
                console.log(this.state.walletHistories)
            })
            .catch(err => console.error(err))
    }

    render() {
        const walletColumns = [
            {
                title: "Date",
                dataIndex: "created_at",
                render: (timestamp) => Formatter.formatDate(timestamp)
            },
            {
                title: "Type",
                dataIndex: "type",
                render: (type) => type.charAt(0).toUpperCase() + type.slice(1)
            },
            {
                title: "Amount",
                dataIndex: "amount",
                render: (amount, record) => {
                    return (
                        record.type === "debit"
                            ? <span className="wallet-page__history__amount--debit">- {Formatter.formatCurrency(amount)}</span>
                            : <span className="wallet-page__history__amount--credit">+ {Formatter.formatCurrency(amount)}</span>
                    )
                }
            }
        ]

        return (
            <Layout>
                <HeaderComponent defaultSelectedKeys={3} />
                <Content>
                    <WalletData 
                        onWithdraw={this.handleGetWalletHistories.bind(this)} />
                    <h1>Wallet History</h1>
                    <Table 
                        className="wallet-page__table"
                        columns={walletColumns} 
                        dataSource={this.state.walletHistories} 
                        loading={this.state.isLoadingHistory}
                        rowKey="id"
                    />
                </Content>
            </Layout>
        )
    }
}