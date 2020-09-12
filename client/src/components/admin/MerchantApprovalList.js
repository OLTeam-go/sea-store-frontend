import React, { Component } from "react"
import { Card, Modal } from "antd"
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

import UserApi from "../../apis/UserApi"
import "./styles/merchant_approval_list.css"
import Formatter from "../../utilities/Formatter"

export default class MerchantApprovalList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoadingMerchantApproval: true,
            inactiveMerchantsList: [],
            acceptModal: {
                isVisible: false,
                merchantInfo: {}
            },
            rejectModal: {
                isVisible: false,
                merchantInfo: {}
            }
        }
    }

    componentDidMount() {
        this.getInactiveMerchantsInfo()
    }

    getInactiveMerchantsInfo() {
        UserApi.handleGetUsers()
            .then(usersData => {
                const inactiveMerchantsList = usersData.data
                    .filter(user => user.type === "merchant" && user.active === false)
                
                this.setState({
                    isLoadingMerchantApproval: false,
                    inactiveMerchantsList: inactiveMerchantsList
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleMerchantApproval(merchantInfo) {
        const newMerchantInfo = Object.assign({}, merchantInfo)
        newMerchantInfo.active = true

        this.setState({
            isLoadingMerchantApproval: true,
            acceptModal: {
                isVisible: false,
                merchantInfo: {}
            }
        })

        UserApi.handleApproveMerchant(newMerchantInfo)
            .then(res => {
                this.getInactiveMerchantsInfo()
            })
            .catch(err => {
                console.err(err)
            })
    }

    handleMerchantRejection(merchantInfo) {
        this.setState({
            isLoadingMerchantApproval: true,
            rejectModal: {
                isVisible: false,
                merchantInfo: {}
            }
        })

        UserApi.handleDeleteUser(merchantInfo.id)
            .then(res => {
                this.getInactiveMerchantsInfo()
            })
            .catch(err => {
                console.err(err)
            })
    }

    handleOpenAcceptModal(merchantInfo) {
        this.setState({
            acceptModal: {
                isVisible: true,
                merchantInfo: merchantInfo
            }
        })

        console.log(merchantInfo)
    }

    handleOpenRejectModal(merchantInfo) {
        this.setState({
            rejectModal: {
                isVisible: true,
                merchantInfo: merchantInfo
            }
        })
    }

    render() {
        return (
            <div className={this.props.className}>
                <Modal
                    title="Accept merchant's registration?"
                    visible={this.state.acceptModal.isVisible}
                    centered
                    onOk={() => this.handleMerchantApproval(this.state.acceptModal.merchantInfo)}
                    onCancel={() => this.setState({ acceptModal: { isVisible: false, merchantInfo: {} }})}
                >
                    <p>After accepting, merchant can login and can sell products</p>
                </Modal>

                <Modal
                    title="Reject merchant's registration?"
                    visible={this.state.rejectModal.isVisible}
                    centered
                    onOk={() => this.handleMerchantRejection(this.state.rejectModal.merchantInfo)}
                    onCancel={() => this.setState({ rejectModal: { isVisible: false, merchantInfo: {} }})}
                >
                    <p>After rejecting, merchant's account will be deleted</p>
                </Modal>

                <h1>Merchants Awaiting Approval</h1>
                {
                    this.state.isLoadingMerchantApproval
                        ? <Card loading={true} />
                        : (
                            <ul className="list">
                                {
                                    this.state.inactiveMerchantsList.length === 0
                                        ? <h2 className="list__text--empty">No one is waiting for approval</h2>
                                        : (
                                            this.state.inactiveMerchantsList.map(merchant => 
                                                <Card
                                                    key={merchant.id}
                                                    className="list__card"
                                                    actions={[
                                                        <CheckOutlined 
                                                            key="accept" 
                                                            onClick={() => this.handleOpenAcceptModal(merchant)}    
                                                        />,
                                                        <CloseOutlined 
                                                            key="reject" 
                                                            onClick={() => this.handleOpenRejectModal(merchant)}
                                                        />
                                                    ]}
                                                >
                                                    <p className="list__card__desc--right-aligned">
                                                        {
                                                            Formatter.formatDate(merchant.created_at)
                                                        }
                                                    </p>
                                                    <p>
                                                        <span className="list__card__label">Username: </span>
                                                        {`${merchant.username}`}
                                                    </p>
                                                    <p>
                                                        <span className="list__card__label">Name: </span>
                                                        {`${merchant.name}`}
                                                    </p>
                                                    <p>
                                                        <span className="list__card__label">Email: </span>
                                                        {`${merchant.email}`}
                                                    </p>
                                                    <p>
                                                        <span className="list__card__label">Gender: </span>
                                                        {`${merchant.gender}`}
                                                    </p>
                                                </Card>
                                            )
                                        )
                                }
                            </ul>
                        )
                }    
            </div>
        )
    }
}