import React, { Component } from "react"
import { Layout, notification } from "antd"

import ProductList from "../../components/ProductList"
import HeaderComponent from "../../components/customer/HeaderComponent"
import "./styles/home_page.css"

const { Content } = Layout

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    componentDidMount() {

    }

    

    handleAddToCart(productId) {
        console.log(`Add to cart called ${productId}`)
        let newProductsState = this.state.products.slice()
        newProductsState.find(product => product.id === productId).quantity -= 1
        this.setState(newProductsState)
        notification.success({
            message: `Product has been added to cart`,
            description: "Product add to cart succeeded",
            duration: 1.5
        })
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

export default HomePage