import React, { Component } from "react"
import { Layout, Table } from "antd"

import HeaderComponent from "../../components/customer/HeaderComponent"
import TransactionApi from "../../apis/TransactionApi"
import AuthSession from "../../services/AuthSession"
import ItemApi from "../../apis/ItemApi"
import Formatter from "../../utilities/Formatter"
import "./styles/transaction_page.css"

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
        this.handleGetTransactionData()
    }

    handleGetTransactionData() {
        const customerId = AuthSession.getUserId()
        const newTransactionData = []
        TransactionApi.handleGetCustomerTransactions(customerId)
            .then(transactions => {
                const itemPromises = []
                transactions.data.data.forEach(data => {
                    const essentialData = {
                        date: data.created_at,
                        bankAccount: data.bank_account_number,
                        bankId: data.bank_id,
                        total: data.cost,
                        status: data.status,
                        cart: []
                    }
                    const itemNamePromises = []
                    data.snapshot_cart_items.forEach(cartItem => {
                        essentialData.cart.push({
                            itemId: cartItem.item_id,
                            quantity: cartItem.quantity
                        })
                        const itemNamePromise = ItemApi.handleGetItem(cartItem.item_id)
                        itemNamePromises.push(itemNamePromise)
                    })
                    newTransactionData.push(essentialData)
                    itemPromises.push(Promise.all(itemNamePromises))
                })
                const bankNamePromise = TransactionApi.handleGetBanks()
                return Promise.all([Promise.all(itemPromises), bankNamePromise])
            })
            .then(result => {
                const transactionsItemInfo = result[0]
                const bankNames = result[1].data.data
                newTransactionData.forEach((transaction, index) => {
                    const bankName = bankNames.find(bankInfo => transaction.bankId === bankInfo.id).name
                    transaction.bankName = bankName
                    const transactionItemInfo = transactionsItemInfo[index]
                    transaction.cart.forEach((cartItem, cartIndex) => {
                        cartItem.itemName = transactionItemInfo[cartIndex].data.data.name
                    })
                })
                this.setState({
                    isLoading: false,
                    transactionData: newTransactionData
                })
                console.log(this.state.transactionData)
            })
            .catch(err => console.error(err))
    }

    render() {
        const transactionColumns = [
            {
                title: "Date",
                dataIndex: "date",
                render: (timestamp) => Formatter.formatDate(timestamp)
            },
            {
                title: "Products",
                dataIndex: "products",
                render: (text, record) => (
                    record.cart.map(cartItem => {
                        return (
                            <div>{`${cartItem.itemName} (${cartItem.quantity} qty)`}</div>
                        )
                    })
                )
            },
            {
                title: "From",
                dataIndex: "from",
                render: (text, record) => (
                    <div>{`${record.bankAccount} [${record.bankName}]`}</div>
                )
            },
            {
                title: "Total",
                dataIndex: "total",
                render: (text) => Formatter.formatCurrency(text)
            },
            {
                title: "Status",
                dataIndex: "status",
                render: (text, record) => ( 
                    record.status === 0
                        ?  <div className="transaction-page__table__status--red">REJECTED</div>
                        : (record.status === 1
                            ? <div className="transaction-page__table__status--grey">PENDING</div>
                            : <div className="transaction-page__table__status--green">ACCEPTED</div>)
                )
            }
        ]

        return (
            <Layout>
                <HeaderComponent defaultSelectedKeys={3} />
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