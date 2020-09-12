import React, { Component } from "react"
import { Table, Popconfirm, Button, message } from "antd"

import TransactionApi from "../../apis/TransactionApi"
import Formatter from "../../utilities/Formatter"
import ItemApi from "../../apis/ItemApi"

export default class TransactionApprovalList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoadingTransaction: true,
            transactionData: []
        }
    }

    componentDidMount() {
        this.getTransactionData()
    }

    getTransactionData() {
        const newTransactionData = []
        this.setState({
            isLoadingTransaction: true
        })
        TransactionApi.handleGetPendingTransactions()
            .then(transactions => {
                const itemPromises = []
                transactions.data.data.forEach(data => {
                    const essentialData = {
                        transactionId: data.id,
                        date: Formatter.formatDate(data.created_at),
                        bankAccount: data.bank_account_number,
                        bankId: data.bank_id,
                        total: Formatter.formatCurrency(data.cost),
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
                    isLoadingTransaction: false,
                    transactionData: newTransactionData
                })
                console.log(this.state.transactionData)
            })
            .catch(err => console.error(err))
    }

    handleAcceptTransaction(transactionId) {
        TransactionApi.handleAcceptTransaction(transactionId)
            .then(res => {
                message.success({
                    content: "Transaction accepted",
                    duration: 2
                })
                this.getTransactionData()
            })
            .catch(err => {
                console.error(err)
                message.error({
                    content: "Accepting transaction failed",
                    duration: 2
                })
            })
    }

    handleRejectTransaction(transactionId) {
        TransactionApi.handleRejectTransaction(transactionId)
            .then(res => {
                message.success({
                    content: "Transaction rejected",
                    duration: 2
                })
                this.getTransactionData()
            })
            .catch(err => {
                console.error(err)
                message.error({
                    content: "Rejecting transaction failed",
                    duration: 2
                })
            })
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
                render: (text, record) => (
                    record.cart.map(cartItem => {
                        return (
                            <div>{`${cartItem.itemName} (${cartItem.quantity} qty)`}</div>
                        )
                    })
                )
            },
            {
                title: "Total",
                dataIndex: "total",
                key: "total"
            },
            {
                title: "From",
                dataIndex: "from",
                render: (text, record) => (
                    <div>{`${record.bankAccount} [${record.bankName}]`}</div>
                )
            },
            {
                title: "Action",
                dataIndex: "action",
                render: (text, record) => (
                    <div>
                        <Popconfirm
                            placement="bottom"
                            title="Are you sure you want to accept this transaction?"
                            onConfirm={() => this.handleAcceptTransaction(record.transactionId)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="link">Accept</Button>
                        </Popconfirm>
                        <Popconfirm
                            placement="bottom"
                            title="Are you sure you want to reject this transaction?"
                            onConfirm={() => this.handleRejectTransaction(record.transactionId)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="link">Reject</Button>
                        </Popconfirm>
                    </div>
                )
            }
        ]

        return (
            <div>
                <h1>Transactions Awaiting Approval</h1>
                {
                    <Table 
                        columns={transactionColumns} 
                        dataSource={this.state.transactionData} 
                        loading={this.state.isLoadingTransaction}
                    />
                }
            </div>
        )
    }
}