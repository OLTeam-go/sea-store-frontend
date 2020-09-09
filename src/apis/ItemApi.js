import Axios from "axios"

class ItemApi {
    apiURL = process.env.REACT_APP_URL_API_ITEM

    handleAddItem(itemInfo) {
        return Axios.post(`${this.apiURL}/item`, itemInfo)
    }

    handleDeleteItem(itemId) {
        return Axios.delete(`${this.apiURL}/item/${itemId}`)
    }

    handleGetItem(itemId) {
        return Axios.get(`${this.apiURL}/item/${itemId}`)
    }

    handleUpdateItem(itemInfo) {
        return Axios.patch(`${this.apiURL}/item/${itemInfo.id}`, itemInfo)
    }

    handleGetItems() {
        return Axios.get(`${this.apiURL}/items`)
    }

    handleGetItemsByMerchant(merchantId) {
        return Axios.get(`${this.apiURL}/items/merchant/${merchantId}`)
    }
}

export default new ItemApi()