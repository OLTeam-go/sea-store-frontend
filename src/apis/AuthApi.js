import Axios from "axios"

class AuthApi {
    apiURL = process.env.REACT_APP_URL_AUTH

    handleLogin({ username, password }) {
        return Axios.post(`${this.apiURL}/login`, {
            username,
            password
        })
    }

    handleRegistration({ username, email, userType, name, gender, password, token }) {
        if (userType === "customer") {
            return this.handleCustomerRegistration({ username, email, name, gender, password })
        }

        if (userType === "merchant") {
            return this.handleMerchantRegistration({ username, email, name, gender, password })
        }

        if (userType === "admin") {
            return this.handleAdminRegistration({ username, email, name, gender, password, token })
        }
    }

    handleCustomerRegistration({ username, email, name, gender, password }) {
        return Axios.post(`${this.apiURL}/register/customer`, {
            username,
            email,
            password,
            name,
            gender
          }
        )
    }

    handleMerchantRegistration({ username, email, name, gender, password }) {
        return Axios.post(`${this.apiURL}/register/merchant`, {
            username,
            email,
            password,
            name,
            gender
          }
        )
    }

    handleAdminRegistration({ username, email, name, gender, password, token }) {
        return Axios.post(`${this.apiURL}/register/admin`, {
            username,
            email,
            password,
            name,
            gender,
            token
          }
        )
    }
}

export default new AuthApi()