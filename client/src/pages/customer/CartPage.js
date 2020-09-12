import React, { Component } from "react"
import { Layout } from "antd"

import HeaderComponent from "../../components/customer/HeaderComponent"
import CartList from "../../components/customer/CartList"
import "./styles/cart_page.css"
import PaymentComponent from "../../components/customer/PaymentComponent"

const { Content } = Layout

class CartPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [],
            isPaying: false
        }
    }

    handleUpdateCart(newCart) {
        this.setState({
            cart: newCart
        })
    }

    handleIsPaying(isPaying) {
        this.setState({
            isPaying: isPaying
        })
    }

    render() {
        return (
            <Layout className="cart-page">
                <HeaderComponent defaultSelectedKeys={4} />

                <Content>
                    <h1>My Cart</h1>
                    <CartList isPaying={this.state.isPaying} onHandleUpdateCart={(newCart) => this.handleUpdateCart(newCart)} />
                    <PaymentComponent onPay={(isPaying) => this.handleIsPaying(isPaying)} cart={this.state.cart} />
                </Content>
            </Layout>
        )
    }
}

export default CartPage