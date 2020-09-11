import React, { Component } from "react"
import { Form, Input, Select, Spin } from "antd"
import BankApi from "../../apis/BankApi"

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16
    }
}

const { Option } = Select

export default class PaymentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoadingBank: true,
            bankList: []
        }
    }

    componentDidMount() {
        this.handleGetBanks()
    }

    handleGetBanks() {
        BankApi.handleGetBanks()
            .then(banks => {
                this.setState({
                    isLoadingBank: false,
                    bankList: banks.data.data
                })
            })
            .catch(err => console.log("Error in fetching bank", err))
    }

    render() {
        return (
            this.state.isLoadingBank
                ? <Spin size="large" />
                : (
                    <Form
                        ref={this.props.reference}
                        {...layout}
                    >
                        <Form.Item
                            label="Bank Name"
                            name="bankName"
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
        )
    }
}