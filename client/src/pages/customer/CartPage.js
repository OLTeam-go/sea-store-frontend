import React, { Component } from "react"
import { Layout, Modal, notification, Button, message } from "antd"

import HeaderComponent from "../../components/customer/HeaderComponent"
import CartList from "../../components/customer/CartList"
import "./styles/cart_page.css"
import PaymentForm from "../../components/customer/PaymentForm"

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
            removeItemModal: {
                isVisible: false,
                productId: null
            },
            payModal: {
                isVisible: false
            }
        }
        this.paymentModalRef = React.createRef()
    }

    handleOpenRemoveModal(productId) {
        this.setState({
            removeItemModal: {
                isVisible: true,
                productId: productId
            }
        })
    }

    handleOpenPayModal() {
        if (this.state.cart.length === 0) {
            message.error("Your cart is empty")
            return
        }

        this.setState({
            payModal: {
                isVisible: true
            }
        })
    }

    handleClosePayModal() {
        this.setState({
            payModal: {
                isVisible: false
            }
        })
    }

    handleRemoveFromCart() {
        const productId = this.state.removeItemModal.productId
        let newCartState = this.state.cart.filter(product => product.id !== productId)
        this.setState({
            cart: newCartState,
            removeItemModal: {
                isVisible: false,
                productId: null
            }
        })
        notification.success({
            message: "Product successfully removed",
            duration: 1.5
        })
    }

    calculatePaymentAmount() {
        if (this.state.cart.length === 0) 
            return 0
            
        return this.state.cart.map(product =>
            product.price * product.quantity
        ).reduce((acc, price) =>
            acc + price
        )
    }

    handleMakePayment() {
        this.paymentModalRef.current
            .validateFields()
            .then(values => {
                console.log(values)
            })
            .catch(err => {
                console.log(err)
            })

        const totalProductPrice = this.calculatePaymentAmount()
        this.setState({
            cart: [],
            payModal: {
                isVisible: false
            }
        })
        notification.success({
            message: "Payment succeeded",
            duration: 1.5
        })
        console.log(totalProductPrice)
    }

    render() {
        const paymentModalFooter = [
            <div key="paymentAmount">{`Total payment: $${this.calculatePaymentAmount()}`}</div>,
            <Button className="modal-footer--right-aligned" key="back" onClick={() => this.handleClosePayModal()}>Cancel</Button>,
            <Button key="submit" type="primary" onClick={() => this.handleMakePayment()}>Pay</Button>
        ]
        return (
            <Layout className="cart-page">
                <HeaderComponent defaultSelectedKeys={5} />
                <Modal
                    title="Remove product from cart?"
                    visible={this.state.removeItemModal.isVisible}
                    centered
                    onOk={() => this.handleRemoveFromCart()}
                    onCancel={() => this.setState({ removeItemModal: { isVisible: false, productId: null }})}
                >
                    <p>This product will be removed from cart</p>
                </Modal>
                    
                <Modal
                    title="Pay for products"
                    visible={this.state.payModal.isVisible}
                    centered
                    onOk={() => this.handleMakePayment()}
                    onCancel={() => this.handleClosePayModal()}
                    footer={paymentModalFooter}
                >
                    <PaymentForm reference={this.paymentModalRef}/>
                </Modal>

                <Content>
                    <h1>My Cart</h1>
                        <CartList 
                            cartList={this.state.cart} 
                            onRemoveFromCart={(productId) => this.handleOpenRemoveModal(productId)}
                        />
                </Content>
                <Button 
                    className="cart-page__fab"
                    onClick={() => this.handleOpenPayModal()}
                > 
                    Make Payment
                </Button>
            </Layout>
        )
    }
}

export default CartPage