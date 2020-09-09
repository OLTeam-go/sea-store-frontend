import Axios from "axios"

class UserApi {
    apiURL = process.env.REACT_APP_URL_USER

    handleGetUsers() {
        return Axios.get(`${this.apiURL}`)
    }

    handleGetUserInfo(userId) {
        return Axios.get(`${this.apiURL}/${userId}`)
    }

    handleUpdateUserInfo(newUserInfo) {
        return Axios.put(`${this.apiURL}/${newUserInfo.ID}`, newUserInfo)
    }

    handleApproveMerchant(merchantInfo) {
        return Axios.put(`${this.apiURL}/${merchantInfo.id}`, merchantInfo)
    }

    handleDeleteUser(userId) {
        return Axios.delete(`${this.apiURL}/${userId}`)
    }
}

export default new UserApi()