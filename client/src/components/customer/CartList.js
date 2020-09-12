import React, { Component } from "react"
import { Button, Table, notification, Popconfirm } from "antd"

import "./styles/cart_list.css"
import TransactionApi from "../../apis/TransactionApi"
import AuthSession from "../../services/AuthSession"
import ItemApi from "../../apis/ItemApi"
import Formatter from "../../utilities/Formatter"

export default class CartList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [],
            isCartLoading: true
        }
    }

    componentDidMount() {
        this.handleGetCart()
    }

    componentDidUpdate(prevProps) {
        if (this.props.isPaying !== prevProps.isPaying)
            this.handleGetCart()
    }

    handleGetCart() {
        const cartNewState = []
        const customerId = AuthSession.getUserId()
        this.setState({
            cart: [],
            isCartLoading: true
        })

        TransactionApi.handleGetCart(customerId)
            .then(cart => {
                if (cart.data.data.cart_items === undefined) return Promise.resolve([])
                const itemInfoPromises = cart.data.data.cart_items.map(item => {
                    cartNewState.push(item)
                    return ItemApi.handleGetItem(item.item_id)
                })
                return Promise.all(itemInfoPromises)
            })
            .then(itemData => {
                itemData.forEach((item, index) => {
                    const itemInfo = {
                        name: item.data.data.name,
                        category: item.data.data.category,
                        price: item.data.data.price
                    }
                    cartNewState[index] = { ...cartNewState[index], ...itemInfo }
                })
                this.setState({
                    cart: cartNewState,
                    isCartLoading: false
                })
                this.props.onHandleUpdateCart(this.state.cart)
            })
            .catch(err => console.error(err))
    }

    handleRemoveFromCart(productId) {
        const customerId = AuthSession.getUserId()
        this.setState({
            isCartLoading: true
        })
        TransactionApi.handleRemoveFromCart(productId, customerId)
            .then(res => {
                this.handleGetCart()
                notification.success({
                    message: "Product removal succeeded",
                    duration: 1.5
                })
            })
            .catch(err => {
                console.error(err)
                notification.error({
                    message: "Product removal failed",
                    duration: 1.5
                })
            })
    }

    render() {
        const cartColumns = [
            {
                title: "Product",
                dataIndex: "name",
                key: "name"
            },
            {
                title: "Category",
                dataIndex: "category",
                key: "category"
            },
            {
                title: "Price",
                dataIndex: "price",
                render: (text) => Formatter.formatCurrency(text)
            },
            {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity"
            },
            {
                title: "Action",
                dataIndex: "action",
                render: (text, record) => (
                    <Popconfirm
                        placement="bottom"
                        title="Are you sure you want to delete this product?"
                        onConfirm={() => this.handleRemoveFromCart(record.item_id)}
                        okText="Yes"
                        cancelText="No"
                        key="remove"
                    >
                        <Button type="link">Remove from Cart</Button>
                    </Popconfirm>
                )
            }
        ]

        return (
            <Table 
                columns={cartColumns} 
                dataSource={this.state.cart} 
                loading={this.state.isCartLoading}
                rowKey="id"
            />
        )
    }
}