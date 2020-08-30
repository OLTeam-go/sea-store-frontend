import React, { Component } from "react"
import { Layout } from "antd"
import { withRouter } from "react-router-dom"

import ProductList from "../components/ProductList"
import HeaderComponent from "../components/HeaderComponent"
import "./styles/home_page.css"

const { Content } = Layout

class HomePage extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            products: [
                {
                    id: "1",
                    name: "Product 1",
                    price: "1000",
                    merchantName: "Merchant 1",
                    quantity: 2
                },
                {
                    id: "2",
                    name: "Product 2",
                    price: "2000",
                    merchantName: "Merchant 2",
                    quantity: 1
                }
            ]
        }
    }

    handleAddToCart(productId) {
        console.log(`Add to cart called ${productId}`)
        let newProductsState = this.state.products.slice()
        newProductsState.find(product => product.id === productId).quantity -= 1
        this.setState(newProductsState)
    }

    render() {
        return (
            <Layout className="home-page">
                <HeaderComponent defaultSelectedKeys={1} />

                <Content>
                    <h1>Products for Sale</h1>
                    <ProductList 
                        productList={this.state.products} 
                        onAddToCart={(productId) => this.handleAddToCart(productId)}
                    />
                </Content>
            </Layout>
        )
    }
}

export default withRouter(HomePage)