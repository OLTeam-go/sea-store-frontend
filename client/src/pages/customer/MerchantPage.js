import React, { Component } from "react"
import { Layout, Card, Table, Button, Spin } from "antd"

import HeaderComponent from "../../components/customer/HeaderComponent"
import UserApi from "../../apis/UserApi"
import ItemApi from "../../apis/ItemApi"

import "./styles/merchant_page.css"

const { Content, Sider } = Layout

export default class MerchantPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            merchantId: this.props.location.state.id,
            merchantInfo: {},
            merchantProducts: [],
            isLoadingMerchantInfo: true,
            isLoadingMerchantProducts: true
        }
    }

    componentDidMount() {
        this.handleGetMerchantInfo()
        this.handleGetMerchantProducts()
    }

    handleGetMerchantInfo() {
        UserApi.handleGetUserInfo(this.state.merchantId)
            .then(merchantInfo => {
                this.setState({
                    merchantInfo: merchantInfo.data,
                    isLoadingMerchantInfo: false
                })
            })
            .catch(err => console.error(err))
    }

    handleGetMerchantProducts() {
        ItemApi.handleGetItemsByMerchant(this.state.merchantId)
            .then(merchantProducts => {
                this.setState({
                    merchantProducts: merchantProducts.data.data,
                    isLoadingMerchantProducts: false
                })
            })
            .catch(err => console.error(err))
    }

    handleAddToCart(productId) {
        console.log(productId)
    }

    render() {
        const productColumns = [
            {
                title: "Name",
                dataIndex: "name",
                key: "name"
            },
            {
                title: "Description",
                dataIndex: "description",
                key: "description"
            },
            {
                title: "Price",
                dataIndex: "price",
                key: "price"
            },
            {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity"
            },
            {
                title: "Category",
                dataIndex: "category",
                key: "category"
            },
            {
                title: "Action",
                dataIndex: "action",
                render: (text, record) => (
                    <Button 
                        type="link"
                        key="add"
                        onClick={() => this.handleAddToCart(record.id)}
                    >
                        Add to Cart
                    </Button>
                )
            }
        ]

        return (
            <Layout className="merchant-page">
                <HeaderComponent />
                <Layout className="merchant-page__content">
                    <Sider className="merchant-page__info">
                        <Card>
                            {
                                this.state.isLoadingMerchantInfo 
                                    ? <Spin size="medium" />
                                    : (
                                        <div>
                                            <h1 className="merchant-page__info__title">Merchant Info</h1>
                                            <p>
                                                <span className="merchant-page__info__label">Username:</span>
                                                {this.state.merchantInfo.username}
                                            </p>
                                            <p>
                                                <span className="merchant-page__info__label">Name:</span>
                                                {this.state.merchantInfo.name}
                                            </p>
                                            <p>
                                                <span className="merchant-page__info__label">Email:</span>
                                                {this.state.merchantInfo.email}
                                            </p>
                                        </div>
                                    )
                            }
                        </Card>
                    </Sider>
                    <Content>
                        <Table 
                            columns={productColumns} 
                            dataSource={this.state.merchantProducts} 
                            loading={this.state.isLoadingMerchantProducts}
                            rowKey="id"
                        />
                    </Content>  
                </Layout>             
            </Layout>
        )
    }
}