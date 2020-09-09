import React, { Component } from "react"
import { Table, Space, Popconfirm, Button } from "antd"

export default class TransactionApprovalList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoadingTransaction: true,
            transactionData: [
                {
                    id: "#123",
                    date: "Jan 31, 2020",
                    product: "RAM",
                    price: 150000,
                    count: 2,
                    total: 300000
                },
                {
                    id: "#11",
                    date: "Jan 28, 2020",
                    product: "Laptop",
                    price: 1000000,
                    count: 1,
                    total: 1000000
                }
            ]
        }
    }

    componentDidMount() {
        this.getTransactionData()
    }

    getTransactionData() {
        this.setState({isLoadingTransaction: true})
        setTimeout(() => {
            this.setState({isLoadingTransaction: false})
        }, 1500)
    }

    handleAcceptTransaction(transactionId) {
        const newTransactionData = this.state.transactionData.filter(transaction => transaction.id !== transactionId)
        this.setState({ transactionData: newTransactionData })
        this.getTransactionData()
    }

    handleRejectTransaction(transactionId) {
        const newTransactionData = this.state.transactionData.filter(transaction => transaction.id !== transactionId)
        this.setState({ transactionData: newTransactionData })
        this.getTransactionData()
    }

    render() {
        const transactionColumns = [
            {
                title: "ID",
                dataIndex: "id",
                key: "id"
            },
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
                title: "Price",
                dataIndex: "price",
                key: "price"
            },
            {
                title: "Count",
                dataIndex: "count",
                key: "count"
            },
            {
                title: "Total",
                dataIndex: "total",
                key: "total"
            },
            {
                title: "Action",
                dataIndex: "action",
                render: (text, record) => (
                    <Space size="middle">
                        <Popconfirm
                            placement="bottom"
                            title="Are you sure you want to accept this transaction?"
                            onConfirm={() => this.handleAcceptTransaction(record.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="link">Accept</Button>
                        </Popconfirm>
                        <Popconfirm
                            placement="bottom"
                            title="Are you sure you want to reject this transaction?"
                            onConfirm={() => this.handleRejectTransaction(record.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="link">Reject</Button>
                        </Popconfirm>
                    </Space>
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