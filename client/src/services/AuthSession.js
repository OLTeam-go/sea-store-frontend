class AuthSession {
    handleLoginSucceeded(credentials) {
        sessionStorage.setItem("authenticatedUser", JSON.stringify(credentials))
    }

    handleLoginFailed() {
        sessionStorage.removeItem("authenticatedUser")
    }

    handleLogout() {
        sessionStorage.removeItem("authenticatedUser")
    }

    handleIsLoggedIn() {
        return JSON.parse(sessionStorage.getItem("authenticatedUser")) !== null
    }

    getUserType() {
        const authedUser = JSON.parse(sessionStorage.getItem("authenticatedUser"))
        if (!authedUser) return null
        else return authedUser.type
    }

    getUserId() {
        const authedUser = JSON.parse(sessionStorage.getItem("authenticatedUser"))
        if (!authedUser) return null
        else return authedUser.id
    }
}

export default new AuthSession()