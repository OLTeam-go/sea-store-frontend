import React, { Component } from "react"
import { Layout, notification, Spin } from "antd"

import ProductList from "../../components/ProductList"
import HeaderComponent from "../../components/customer/HeaderComponent"
import "./styles/home_page.css"
import ItemApi from "../../apis/ItemApi"
import UserApi from "../../apis/UserApi"

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
                        quantity: product.quantity
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
        const productNewState = this.state.products.slice()
        const targetProduct = productNewState.find(product => product.id === productId)
        const targetProductName = targetProduct.name
        targetProduct.quantity -= 1
        this.setState(productNewState)
        notification.success({
            message: `Product has been added to cart`,
            description: `Product with name "${targetProductName}" added`,
            duration: 1.5
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