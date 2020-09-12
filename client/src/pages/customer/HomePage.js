import React, { Component } from "react"
import { Layout, notification, Spin } from "antd"

import ProductList from "../../components/ProductList"
import HeaderComponent from "../../components/customer/HeaderComponent"
import "./styles/home_page.css"
import ItemApi from "../../apis/ItemApi"
import UserApi from "../../apis/UserApi"
import AuthSession from "../../services/AuthSession"
import TransactionApi from "../../apis/TransactionApi"

const { Content } = Layout

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            isLoadingProduct: true
        }
    }

    componentDidMount() {
        this.getItemsInfo()
    }

    getItemsInfo() {
        const productNewState = []
        ItemApi.handleGetItems()
            .then(productData => {
                if (productData.data.data === null) return Promise.resolve([])
                const merchantInfoPromises = productData.data.data.map(product => {
                    productNewState.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: product.quantity,
                        category: product.category
                    })
                    return UserApi.handleGetUserInfo(product["merchant_id"])
                })
                return Promise.all(merchantInfoPromises)
            })
            .then(merchantData => {
                merchantData.forEach((merchant, index) => {
                    productNewState[index].merchantName = merchant.data.name
                    productNewState[index].merchantId = merchant.data.id
                })
                this.setState({
                    products: productNewState,
                    isLoadingProduct: false
                })
            })
            .catch(err => {
                console.log(err)
            })
    } 

    handleAddToCart(productId) {
        const customerId = AuthSession.getUserId()
        const targetProductName = this.state.products.find(product => product.id === productId).name
        TransactionApi.handleAddToCart(productId, customerId)
            .then(res => {
                notification.success({
                    message: "Product added to cart",
                    description: `One product with name ${targetProductName}`,
                    duration: 1.5
                })
            })
            .catch(err => {
                notification.error({
                    message: "Product add to cart failed",
                    duration: 1.5
                })
            })
    }

    render() {
        return (
            <Layout className="home-page">
                <HeaderComponent defaultSelectedKeys={1} />                
                <Content>
                    <h1>Products for Sale</h1>
                    {
                        this.state.isLoadingProduct
                            ? <Spin size="large" />
                            : (
                                <ProductList 
                                    productList={this.state.products} 
                                    onAddToCart={(productId) => this.handleAddToCart(productId)}
                                />
                            )
                    }
                </Content>
            </Layout>
        )
    }
}

export default HomePage