import React, { Component } from "react"
import { Button, Modal, Form, InputNumber, message } from "antd"
import Formatter from "../../utilities/Formatter"
import WalletApi from "../../apis/WalletApi"

export default class WithdrawWalletComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false
        }
        this.withdrawFormRef = React.createRef()
    }

    handleOpenModal() {
        this.setState({
            isModalVisible: true
        })
    }

    handleCloseModal() {
        this.setState({
            isModalVisible: false
        })
        this.withdrawFormRef.current.resetFields()
    }

    handleWithdrawBalance() {
        this.withdrawFormRef.current
            .validateFields()
            .then(value => {
                const amount = value.amount
                this.props.onWithdrawing()
                WalletApi.handleWithdrawBalance(this.props.walletId, amount)
                    .then(res => { 
                            message.success({
                            content: "Withdrawal succeeded",
                            duration: 1.5
                        })
                        this.props.onWithdraw()
                    })
                    .catch(err => {
                        message.error({
                            content: "Withdrawal failed",
                            duration: 1.5
                        })
                    })
                this.handleCloseModal()
            })
            .catch(err => {
                console.error(err)
            })
    }

    render() {
        const withdrawBalanceFooter = [
            <Button className="modal-footer--right-aligned" key="back" onClick={this.handleCloseModal.bind(this)}>Cancel</Button>,
            <Button key="submit" type="primary" onClick={this.handleWithdrawBalance.bind(this)}>Withdraw</Button>
        ]

        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16
            }
        }

        return (
            <div>
                <Button
                    type="primary"
                    onClick={this.handleOpenModal.bind(this)}
                >
                    Withdraw
                </Button>

                <Modal
                    title="Withdraw Balance"
                    visible={this.state.isModalVisible}
                    centered
                    onOk={this.handleWithdrawBalance.bind(this)}
                    onCancel={this.handleCloseModal.bind(this)}
                    footer={withdrawBalanceFooter}
                >
                    <Form
                        {...layout}
                        ref={this.withdrawFormRef}
                    >
                        <Form.Item
                            label="Amount"
                            name="amount"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input a valid amount to withdraw"
                                }
                            ]}
                        >
                            <InputNumber 
                                max={this.props.balance} 
                                formatter={value => Formatter.formatCurrency(value)}    
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}