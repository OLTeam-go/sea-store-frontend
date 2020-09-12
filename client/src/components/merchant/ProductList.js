import React, { Component } from "react"
import { Table, Button, Popconfirm, Space, notification } from "antd"
import EditProductForm from "./EditProductForm"
import ItemApi from "../../apis/ItemApi"
import Modal from "antd/lib/modal/Modal"
import "./styles/product_list.css"

export default class ProductList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editModal: {
                isVisible: false,
                isLoading: false,
                currentProductInfo: {}
            }
        }
        this.editProductFormRef = React.createRef()
    }

    handleOpenEditModal(productId) {
        this.setState({
            editModal: {
                isVisible: true,
                isLoading: true
            }
        })

        ItemApi.handleGetItem(productId)
            .then(productInfo => {
                if (productInfo.data.data === null) return Promise.reject("Product not found")
                this.setState({
                    editModal: {
                        isVisible: true,
                        isLoading: false,
                        currentProductInfo: productInfo.data.data
                    }
                })
            })
            .catch(err => {
                console.error(err)
                this.setState({
                    editModal: {
                        isVisible: false,
                        isLoading: false,
                        currentProductInfo: {}
                    }
                })
                notification.error({
                    message: "Product not found",
                    duration: 1.5
                })
            })
            .finally(() => {
                this.setState({
                    editModal: {
                        isVisible: true,
                        isLoading: false,
                        currentProductInfo: this.state.editModal.current
                    }
                })
            })
    }

    handleCloseEditModal() {
        this.setState({
            editModal: {
                isVisible: false,
                isLoading: false,
                currentProductInfo: {}
            }
        })
    }

    handleEditProduct() {
        this.handleCloseEditModal()
        this.editProductFormRef.current
            .validateFields()
            .then(values => {
                this.props.onEditProduct(values)
            })
            .catch(err => console.error(err))
    }

    render() {
        const transactionColumns = [
            {
                title: "Name",
                dataIndex: "name",
                key: "name"
            },
            {
                title: "Description",
                dataIndex: "description",
                key: "description"
            },
            {
                title: "Price",
                dataIndex: "price",
                key: "price"
            },
            {
                title: "Quantity",
                dataIndex: "quantity",
                render: (text) => text === 0 ? <span className="product-list__quantity--zero">OUT OF STOCK</span> : text
            },
            {
                title: "Category",
                dataIndex: "category",
                key: "category"
            },
            {
                title: "Action",
                dataIndex: "action",
                render: (text, record) => (
                    <Space size="middle">
                        <Button 
                            type="link" 
                            key="edit"
                            onClick={this.handleOpenEditModal.bind(this, record.id)}
                        >
                            Edit
                        </Button>
                        <Popconfirm
                            placement="bottom"
                            title="Are you sure you want to delete this product?"
                            onConfirm={() => this.props.onDeleteProduct(record.id)}
                            okText="Yes"
                            cancelText="No"
                            key="delete"
                        >
                            <Button type="link">Delete</Button>
                        </Popconfirm>
                    </Space>
                )
            }
        ]

        const editProductFooter = [
            <Button 
                className="modal-footer--right-aligned" 
                key="back" 
                onClick={this.handleCloseEditModal.bind(this)}
            >
                Cancel
            </Button>,
            <Button 
                key="submit" 
                type="primary" 
                onClick={this.handleEditProduct.bind(this)}
            >
                Edit
            </Button>
        ]

        return (
            <div>
                <Table 
                    columns={transactionColumns} 
                    dataSource={this.props.list} 
                    loading={this.props.loading}
                    rowKey="id"
                />

                <Modal
                    title="Edit a product"
                    visible={this.state.editModal.isVisible}
                    centered
                    onOk={this.handleEditProduct.bind(this)}
                    onCancel={this.handleCloseEditModal.bind(this)}
                    footer={editProductFooter}
                >
                    <EditProductForm 
                        reference={this.editProductFormRef} 
                        loading={this.state.editModal.isLoading}    
                        info={this.state.editModal.currentProductInfo}
                    />
                </Modal>
            </div>
        )
    }
}