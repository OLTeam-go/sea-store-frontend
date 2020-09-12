import HomePage from "../pages/customer/HomePage"
import ProfilePage from "../pages/customer/ProfilePage"
import TransactionPage from "../pages/customer/TransactionPage"
import CartPage from "../pages/customer/CartPage"

import MerchantPage from "../pages/customer/MerchantPage"

export default [
    { path: "/customer/home", component: HomePage },
    { path: "/customer/profile", component: ProfilePage },
    { path: "/customer/transaction", component: TransactionPage },
    { path: "/customer/cart", component: CartPage },
    { path: "/customer/merchant", component: MerchantPage }
]