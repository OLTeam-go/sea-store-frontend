import React, { Component } from "react"
import { Button } from "antd"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"

import "./styles/product_list.css"

class ProductList extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    }

    handleMerchantClick(merchantInfo) {
        this.props.history.push({
            pathname: `/customer/merchant/${merchantInfo.name}`,
            state: { id: merchantInfo.id }
        })
    }

    render() {
        const productItems = this.props.productList.map(product => {
            if (product.quantity > 0) {
                return (
                    <li key={product.id} className={"product-list__item"}>
                        <div>{product.name}</div>
                        <Button 
                            type="link"
                            onClick={() => this.handleMerchantClick({
                                id: product.merchantId,
                                name: product.merchantName
                            })}
                        >
                            {product.merchantName}
                        </Button>
                        <div>{product.price}</div>
                        <div>{product.quantity}</div>
                        <Button
                            onClick={() => this.props.onAddToCart(product.id)}
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
                    <div>Product</div>
                    <div>Merchant</div>
                    <div>Price</div>
                    <div>Quantity</div>
                </li>
                {productItems}
            </ul>
        )
    }
}

export default withRouter(ProductList)