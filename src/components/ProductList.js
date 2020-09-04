import React from "react"
import { Button } from "antd"

import "./styles/product_list.css"

export default function ProductList(props) {
    const productItems = props.productList.map(product => {
        if (product.quantity > 0) {
            return (
                <li key={product.id} className={"product-list__item"}>
                    <div>{product.name}</div>
                    <div>{product.merchantName}</div>
                    <div>{product.price}</div>
                    <div>{product.quantity}</div>
                    <Button
                        onClick={() => props.onAddToCart(product.id)}
                    >
                        Add to Cart
                    </Button>
                </li>
            )
        } else return null
    })

    return (
        <ul className="product-list">
            <li className="product-list__title">
                <div>Product Name</div>
                <div>Merchant Name</div>
                <div>Price</div>
                <div>Quantity</div>
            </li>
            {productItems}
        </ul>
    )
}