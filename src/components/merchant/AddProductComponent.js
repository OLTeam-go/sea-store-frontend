import React, { Component } from "react"
import { Button, Modal, notification } from "antd"

import "./styles/add_product_component.css"
import AddProductForm from "./AddProductForm"
import AuthSession from "../../services/AuthSession"
import ItemApi from "../../apis/ItemApi"

export default class AddProductComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addModal: {
                isVisible: false,
                isLoading: false
            }
        }
        this.addProductRef = React.createRef()
    }

    handleOpenAddModal() {
        this.setState({
            addModal: {
                isVisible: true
            }
        })
    }

    handleCloseAddModal() {
        this.setState({
            addModal: {
                isVisible: false
            }
        })
        this.addProductRef.current.resetFields()
    }

    handleAddProduct() {
        this.addProductRef.current
            .validateFields()
            .then(values => {
                this.handleCloseAddModal()

                const itemInfo = Object.assign({}, values)
                itemInfo["merchant_id"] = AuthSession.getUserId()
                ItemApi.handleAddItem(itemInfo)
                    .then(res => {
                        notification.success({
                            message: "Product added",
                            duration: 1.5
                        })
                        this.props.onAddProduct()
                    })
            })
            .catch(err => {
                console.log(err)
                notification.error({
                    message: "Product add failed",
                    duration: 1.5
                })
            })
    }

    render() {
        const addProductFooter = [
            <Button className="modal-footer--right-aligned" key="back" onClick={this.handleCloseAddModal.bind(this)}>Cancel</Button>,
            <Button key="submit" type="primary" onClick={this.handleAddProduct.bind(this)}>Add</Button>
        ]
        
        return (
            <div className="add-product">
                <Modal
                    title="Add a Product"
                    visible={this.state.addModal.isVisible}
                    centered
                    onOk={this.handleAddProduct.bind(this)}
                    onCancel={this.handleCloseAddModal.bind(this)}
                    footer={addProductFooter}
                >
                    <AddProductForm reference={this.addProductRef}/>
                </Modal>

                <Button 
                    className="add-product__fab"
                    onClick={this.handleOpenAddModal.bind(this)}
                > 
                    Add
                </Button>
            </div>
        )
    }
}