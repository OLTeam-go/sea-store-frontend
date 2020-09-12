import Axios from "axios"

class WalletApi {
    apiURL = process.env.REACT_APP_URL_API_USER

    handleGetWallets() {
        return Axios.get(`${this.apiURL}/wallets`)
    }

    handleWithdrawBalance(walletId, amount) {
        return Axios.put(`${this.apiURL}/transactions/${walletId}/debit`, {
            amount: amount
        })
    }

    handleGetWalletHistories() {
        return Axios.get(`${this.apiURL}/transactions/histories`)
    }
}

export default new WalletApi()