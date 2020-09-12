import React, { Component } from "react"
import { Form, Input, Select, Spin, Button, message, notification } from "antd"
import TransactionApi from "../../apis/TransactionApi"
import Modal from "antd/lib/modal/Modal"
import AuthSession from "../../services/AuthSession"
import Formatter from "../../utilities/Formatter"

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16
    }
}

const { Option } = Select

export default class PaymentComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoadingBank: true,
            bankList: [],
            payModal: {
                isVisible: false
            }
        }
        this.paymentFormRef = React.createRef()
    }

    handleGetBanks() {
        TransactionApi.handleGetBanks()
            .then(banks => {
                this.setState({
                    isLoadingBank: false,
                    bankList: banks.data.data
                })
            })
            .catch(err => console.log("Error in fetching bank", err))
    }

    handleOpenPayModal() {
        if (this.props.cart.length === 0) {
            message.error("Your cart is empty")
            return
        }

        this.handleGetBanks()
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

    calculatePaymentAmount() {
        if (this.props.cart.length === 0) 
            return 0
            
        return this.props.cart.map(product =>
            product.price * product.quantity
        ).reduce((acc, price) =>
            acc + price
        )
    }

    handleMakePayment() {
        this.handleClosePayModal()
        this.props.onPay(true)
        this.paymentFormRef.current
            .validateFields()
            .then(values => {
                const customerId = AuthSession.getUserId()
                return TransactionApi.handleCartCheckout(customerId, values.bankAccount, values.bankId)      
            })
            .then(res => {
                notification.success({
                    message: "Payment succeeded",
                    duration: 1.5
                })
            })
            .catch(err => {
                console.error(err)
                notification.error({
                    message: "Payment failed",
                    duration: 1.5
                })
            })
            .finally(() => {
                this.props.onPay(false)
            })
    }

    render() {        
        const paymentModalFooter = [
            <div key="paymentAmount">{`Total payment: ${Formatter.formatCurrency(this.calculatePaymentAmount())}`}</div>,
            <Button className="modal-footer--right-aligned" key="back" onClick={() => this.handleClosePayModal()}>Cancel</Button>,
            <Button key="submit" type="primary" onClick={() => this.handleMakePayment()}>Pay</Button>
        ]

        return (
            <div>
                <Modal
                    title="Pay for products"
                    visible={this.state.payModal.isVisible}
                    centered
                    onOk={() => this.handleMakePayment()}
                    onCancel={() => this.handleClosePayModal()}
                    footer={paymentModalFooter}
                >
                    {
                        this.state.isLoadingBank
                            ? <Spin size="large" />
                            : (
                                <Form
                                    ref={this.paymentFormRef}
                                    {...layout}
                                >
                                    <Form.Item
                                        label="Bank Name"
                                        name="bankId"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your bank name"
                                            }
                                        ]}
                                    >
                                        <Select
                                            placeholder="Select your bank name"
                                        >
                                            {
                                                this.state.bankList.map(bank =>
                                                    <Option value={bank.id} key={bank.id}>{bank.name}</Option>
                                                )
                                            }
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label="Account"
                                        name="bankAccount"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your bank account number"
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Form>
                            )
                    }
                </Modal>
                <Button 
                    className="cart-page__fab"
                    onClick={() => this.handleOpenPayModal()}
                > 
                    Make Payment
                </Button>
            </div>
        )
    }
}