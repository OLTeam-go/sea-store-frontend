import HomePage from "../pages/merchant/HomePage"
import ProfilePage from "../pages/merchant/ProfilePage"
import WalletPage from "../pages/merchant/WalletPage"
import RequestPage from "../pages/merchant/RequestPage"

export default [
    { path: "/merchant/home", component: HomePage },
    { path: "/merchant/profile", component: ProfilePage},
    { path: "/merchant/wallet", component: WalletPage },
    { path: "/merchant/request", component: RequestPage }
]