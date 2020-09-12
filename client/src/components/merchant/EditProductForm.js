import React, { Component } from "react"
import { Form, Input, InputNumber, Spin } from "antd"

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16
    }
}

export default class EditProductForm extends Component {
    render() {
        return (
            this.props.loading
                ? <Spin size="large" />
                : (
                    <Form 
                        {...layout} 
                        ref={this.props.reference}
                        initialValues={this.props.info}
                    >
                        <Form.Item
                            label="ID"
                            name="id"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your product id"
                                }
                            ]}
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your product name"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your product price"
                                }
                            ]}
                        >
                            <InputNumber 
                                min={0} 
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Quantity"
                            name="quantity"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your product quantity"
                                }
                            ]}
                        >
                            <InputNumber min={1} />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your product description"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Category"
                            name="category"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your product category"
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