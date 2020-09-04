import React from "react"
import { Button } from "antd"

import "./styles/cart_list.css"

export default function CartList(props) {
    const cartItems = props.cartList.map(product => {
        if (product.quantity > 0) {
            return (
                <li key={product.id} className={"cart-list__item"}>
                    <div>{product.name}</div>
                    <div>{product.merchantName}</div>
                    <div>{product.price}</div>
                    <div>{product.quantity}</div>
                    <Button
                        onClick={() => props.onRemoveFromCart(product.id)}
                    >
                        Remove from Cart
                    </Button>
                </li>
            )
        } else return null
    })

    return (
        <ul className="cart-list">
            <li className="cart-list__title">
                <div>Product Name</div>
                <div>Merchant Name</div>
                <div>Price</div>
                <div>Quantity</div>
            </li>
            {cartItems}
        </ul>
    )
}