import React, { Component } from "react"
import { Layout } from "antd"

import HeaderComponent from "../../components/customer/HeaderComponent"
import "./styles/order_page.css"

const { Content } = Layout

class OrderPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderList: [
                {
                    id: "#121",
                    name: "Computer",
                    date: "August 12, 2020",
                    price: "10000",
                    status: "succeeded"
                },
                {
                    id: "#122",
                    name: "Laptop",
                    date: "August 13, 2020",
                    price: "20000",
                    status: "failed"
                }
            ]
        }
    }

    render() {
        return(
            <Layout>
                <HeaderComponent defaultSelectedKeys={3} />
                <Content>
                    <h1>Order</h1>
                    <ul className="order-list">
                        <li className="order-list__title">
                            <div>Order ID</div>
                            <div>Product Name</div>
                            <div>Date</div>
                            <div>Price</div>
                            <div>Status</div>
                        </li>
                        {
                            this.state.orderList.map(order => 
                                <li key={order.id} className={"order-list__item"}>
                                    <div>{order.id}</div>
                                    <div>{order.name}</div>
                                    <div>{order.date}</div>
                                    <div>{order.price}</div>
                                    <div 
                                        className={order.status === "succeeded" ? "order-list__item--succeeded" : "order-list__item--failed"}
                                    >
                                        {order.status}
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </Content>
            </Layout>
        )
    }
}

export default OrderPage