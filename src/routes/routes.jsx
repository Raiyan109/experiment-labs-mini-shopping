import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import Products from "../pages/products/Products";
import AllProducts from "../pages/products/AllProducts";
import Cart from "../pages/cart/Cart";
import Success from "../pages/order/Success";
import Payment from "../pages/order/Payment";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/products',
        element: <Products />
    },
    {
        path: '/allProducts',
        element: <AllProducts />
    },
    {
        path: '/cart',
        element: <Cart />
    },
    {
        path: '/payment',
        element: <Payment />
    },
    {
        path: '/success',
        element: <Success />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signUp',
        element: <SignUp />
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />
    },

])

export default routes