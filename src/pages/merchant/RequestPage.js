import React, { Component } from "react"
import { Layout, Table } from "antd"
import HeaderComponent from "../../components/merchant/HeaderComponent"

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
        setTimeout(() => {
            this.setState({
                isLoading: false,
                requestData: [
                    {
                        date: "Mon 25 Sep 2020",
                        customer: "Michelle",
                        product: "Laptop",
                        quantity: 1
                    },
                    {
                        date: "Tue 26 Sep 2020",
                        customer: "Vincent",
                        product: "Camera",
                        quantity: 2
                    }
                ]
            })
        }, 2000)
    }

    render() {
        const requestColumns = [
            {
                title: "Order Date",
                dataIndex: "date",
                key: "date"
            },
            {
                title: "Customer",
                dataIndex: "customer",
                key: "customer"
            },
            {
                title: "Product",
                dataIndex: "product",
                key: "product"
            },
            {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity"
            }
        ]

        return (
            <Layout>
                <HeaderComponent defaultSelectedKeys={4} />
                <Content>
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