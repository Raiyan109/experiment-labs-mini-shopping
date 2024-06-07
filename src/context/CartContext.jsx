/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [cartTotal, setCartTotal] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { mernAuth } = useContext(AuthContext)

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                const res = await axios.get('https://experiment-labs-mini-shopping-be.vercel.app/api/cart', {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${mernAuth?.token}`
                    }
                })
                console.log(res.data);
                if (res.data) {
                    setCartTotal(res.data.total);
                    setCart(res.data.products);
                    setIsLoading(false)
                } else {
                    setCartTotal(0);
                    setCart([]);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error("Authentication failed!", error.response.data.message);
                    // Handle 401 error (e.g., redirect to login page)
                } else {
                    console.error("Error fetching cart", error);
                }
            }
        })()
    }, [mernAuth?.token])

    const value = {
        cart,
        cartTotal,
        isLoading
    }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
        // <CartContext.Provider value={[cart, setCart, cartTotal]}>
        //     {children}
        // </CartContext.Provider>
    )
}

// Custom hook
export const useCart = () => useContext(CartContext)