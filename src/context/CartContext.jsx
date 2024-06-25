/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [cartTotal, setCartTotal] = useState('')
    // const [isLoading, setIsLoading] = useState(false)
    const { mernAuth } = useContext(AuthContext)

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await axios.get('https://experiment-labs-mini-shopping-be.vercel.app/api/cart', {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${mernAuth?.token}`
                    }
                });
                if (res.data) {
                    setCartTotal(res.data.total);
                    setCart(res.data.products);
                } else {
                    setCartTotal(0);
                    setCart([]);
                }
            } catch (error) {
                console.error("Error fetching cart", error);
            }
        };

        fetchCart();
    }, [mernAuth?.token]);

    const addToCart = async (productId, quantity = 1) => {
        try {
            const res = await axios.post('https://experiment-labs-mini-shopping-be.vercel.app/api/cart/addToCart', {
                productId,
                quantity,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${mernAuth?.token}`
                }
            });

            setCart(res.data.products);
            setCartTotal(res.data.total);
        } catch (error) {
            console.error("Error adding to cart", error);
        }
    };

    const updateCartItemQuantity = async (id, quantity) => {
        try {
            const res = await axios.put(`https://experiment-labs-mini-shopping-be.vercel.app/api/cart/${id}`, {
                quantity,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${mernAuth?.token}`
                }
            });

            setCart(res.data.products);
            setCartTotal(res.data.total);
        } catch (error) {
            console.error("Error updating cart item quantity", error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const res = await axios.delete(`https://experiment-labs-mini-shopping-be.vercel.app/api/cart/${productId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${mernAuth?.token}`
                }
            });

            setCart(res.data.products);
            setCartTotal(res.data.total);
        } catch (error) {
            console.error("Error removing from cart", error);
        }
    };


    const value = {
        cart,
        cartTotal,
        addToCart,
        removeFromCart,
        updateCartItemQuantity
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