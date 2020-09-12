import React, { Component }  from "react"
import { Layout, notification } from "antd"

import HeaderComponent from "../../components/merchant/HeaderComponent"
import AddProductComponent from "../../components/merchant/AddProductComponent"
import ItemApi from "../../apis/ItemApi"
import AuthSession from "../../services/AuthSession"
import ProductList from "../../components/merchant/ProductList"

const { Content } = Layout

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoadingProduct: true,
            productList: [],
            merchantId: AuthSession.getUserId()
        }
    }

    componentDidMount() {
        this.handleGetItems()
    }

    handleGetItems() {
        this.setState({ isLoadingProduct: true })
        ItemApi.handleGetItemsByMerchant(this.state.merchantId)
            .then(res => {
                this.setState({ isLoadingProduct: false })
                this.setState({
                    productList: res.data.data ? res.data.data : []
                })
            })
            .catch(err => {
                console.error(err)
            })
    }

    handleEditItem(newItemInfo) {
        this.setState({ isLoadingProduct: true })
        ItemApi.handleUpdateItem(newItemInfo)
            .then(res => {
                notification.success({
                    message: "Product has been updated",
                    duration: 1.5
                })
            })
            .catch(err => {
                notification.error({
                    message: "Product update failed",
                    duration: 1.5
                })
            })
            .finally(this.handleGetItems.bind(this))
    }

    handleDeleteItem(itemId) {
        this.setState({ isLoadingProduct: true })
        ItemApi.handleDeleteItem(itemId)
            .then(res => {
                notification.success({
                    message: "Product has been deleted",
                    duration: 1.5
                })
            })
            .catch(err => {
                notification.error({
                    message: "Product deletion failed",
                    duration: 1.5
                })
            })
            .finally(this.handleGetItems.bind(this))
    }

    render() {
        return (
            <Layout className="home-page">
                <HeaderComponent defaultSelectedKeys={1} />
                <Content>
                    <h1>Products For Sale</h1>
                    <AddProductComponent onAddProduct={this.handleGetItems.bind(this)} />
                    <ProductList 
                        list={this.state.productList} 
                        loading={this.state.isLoadingProduct}
                        onDeleteProduct={this.handleDeleteItem.bind(this)}
                        onEditProduct={this.handleEditItem.bind(this)}
                    />
                </Content>
            </Layout>
        )
    }
}