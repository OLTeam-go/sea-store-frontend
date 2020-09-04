import React, { Component } from "react"
import { Layout, Modal, notification, Button } from "antd"

import HeaderComponent from "../../components/customer/HeaderComponent"
import CartList from "../../components/customer/CartList"
import "./styles/cart_page.css"

const { Content } = Layout

class CartPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [
                {
                    id: "1",
                    name: "Product 1",
                    price: 1000,
                    merchantName: "Merchant 1",
                    quantity: 2
                },
                {
                    id: "2",
                    name: "Product 2",
                    price: 2000,
                    merchantName: "Merchant 2",
                    quantity: 1
                }
            ],
            removeModal: {
                isVisible: false,
                productId: null
            }
        }
    }

    handleOpenModal(productId) {
        this.setState({
            removeModal: {
                isVisible: true,
                productId: productId
            }
        })
    }

    handleRemoveFromCart() {
        const productId = this.state.removeModal.productId
        let newCartState = this.state.cart.filter(product => product.id !== productId)
        this.setState({
            cart: newCartState,
            removeModal: {
                isVisible: false,
                productId: null
            }
        })
        notification.success({
            message: "Product successfully removed",
            duration: 1.5
        })
    }

    handleMakePayment() {
        const totalProductPrice = this.state.cart.map(product =>
            product.price * product.quantity
        ).reduce((acc, price) =>
            acc + price
        )
        
        console.log(totalProductPrice)
    }

    render() {
        return (
            <Layout className="cart-page">
                <HeaderComponent defaultSelectedKeys={4} />
                <Content>
                    <Modal
                        title="Remove product from cart?"
                        visible={this.state.removeModal.isVisible}
                        centered
                        onOk={() => this.handleRemoveFromCart()}
                        onCancel={() => this.setState({ removeModal: { isVisible: false, productId: null }})}
                    >
                        <p>This product will be removed from cart</p>
                    </Modal>
                    <h1>My Cart</h1>
                        <CartList 
                            cartList={this.state.cart} 
                            onRemoveFromCart={(productId) => this.handleOpenModal(productId)}
                        />
                </Content>
                <Button 
                    className="cart-page__fab"
                    onClick={() => this.handleMakePayment()}
                > 
                    Make Payment
                </Button>
            </Layout>
        )
    }
}

export default CartPage