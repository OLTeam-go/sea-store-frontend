import Axios from "axios"

class BankApi {
    apiURL = process.env.REACT_APP_URL_API_BANK

    handleGetBanks() {
        return Axios.get(`${this.apiURL}/banks`)
    }
}

export default new BankApi()