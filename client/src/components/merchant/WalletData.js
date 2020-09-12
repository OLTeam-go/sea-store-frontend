import React, { Component } from "react"
import WalletApi from "../../apis/WalletApi"
import AuthSession from "../../services/AuthSession"
import Formatter from "../../utilities/Formatter"

import "./styles/wallet_data.css"
import WithdrawWalletComponent from "./WithdrawWalletComponent"

export default class WalletData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            walletData: {}
        }
    }
    
    componentDidMount() {
        this.handleGetWalletData()
    }

    handleGetWalletData() {
        this.setState({ isLoading: true })
        const merchantId = AuthSession.getUserId()
        WalletApi.handleGetWallets()
            .then(walletData => {
                if (!walletData.data) return Promise.resolve([])
                this.setState({
                    isLoading: false,
                    walletData: walletData.data.find(wallet => wallet.user_id === merchantId)
                })
            })
            .catch(err => console.error(err))
    }

    render() {
        return (
            <div className="wallet-data">
                <img src={process.env.PUBLIC_URL + "/images/wallet.png"} alt="Wallet" />
                <div className="wallet-data__info">
                    <p>
                        You have: {
                            this.state.isLoading
                                ? "-"
                                : <span className="wallet-data__info__balance">{Formatter.formatCurrency(this.state.walletData.balance)}</span>
                        }
                    </p>
                    <WithdrawWalletComponent 
                        balance={this.state.walletData.balance} 
                        walletId={this.state.walletData.id}
                        onWithdrawing={() => this.setState({ isLoading: true })}
                        onWithdraw={() => {
                                this.handleGetWalletData()
                                this.props.onWithdraw()
                            }
                        }
                    />
                </div>
            </div>
        )
    }
}