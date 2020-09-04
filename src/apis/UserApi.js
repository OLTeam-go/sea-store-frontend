import Axios from "axios"

class UserApi {
    apiURL = process.env.REACT_APP_URL_USER

    handleGetUserInfo(userId) {
        return Axios.get(`${this.apiURL}/${userId}`)
    }
}

export default new UserApi();