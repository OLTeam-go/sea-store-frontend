import HomePage from "../pages/customer/HomePage";
import ProfilePage from "../pages/customer/ProfilePage";
import OrderPage from "../pages/customer/OrderPage";
import CartPage from "../pages/customer/CartPage";

export default [
    { path: "/customer/home", component: HomePage },
    { path: "/customer/profile", component: ProfilePage },
    { path: "/customer/order", component: OrderPage },
    { path: "/customer/cart", component: CartPage }
]