import Axios from "axios"

class TransactionApi {
    apiURL = process.env.REACT_APP_URL_API_TRANSACTION

    handleGetBanks() {
        return Axios.get(`${this.apiURL}/banks`)
    }

    handleGetPendingTransactions() {
        return Axios.get(`${this.apiURL}/transactions?filter=pending`)
    }

    handleGetCustomerTransactions(customerId) {
        return Axios.get(`${this.apiURL}/transactions/history/${customerId}`)
    }

    handleCartCheckout(customerId, bankAccountNumber, bankId) {
        return Axios.post(`${this.apiURL}/transaction/checkout/${customerId}`, {
            bank_account_number: bankAccountNumber,
            bank_id: bankId
        })
    }

    handleAddToCart(productId, customerId) {
        return Axios.post(`${this.apiURL}/cart/customer/add/${customerId}`, {
            item_id: productId,
            quantity: 1
        })
    }

    handleRemoveFromCart(productId, customerId) {
        return Axios.post(`${this.apiURL}/cart/customer/remove/${customerId}`, {
            item_id: productId,
            quantity: 1
        })
    }

    handleGetCart(customerId) {
        return Axios.get(`${this.apiURL}/cart/customer/${customerId}`)
    }

    handleAcceptTransaction(transactionId) {
        return Axios.post(`${this.apiURL}/transaction/accept/${transactionId}`)
    }

    handleRejectTransaction(transactionId) {
        return Axios.post(`${this.apiURL}/transaction/reject/${transactionId}`)
    }

    handleGetMerchantRequest(merchantId) {
        return Axios.get(`${this.apiURL}/transactions/merchant/${merchantId}`)
    }
}

export default new TransactionApi()