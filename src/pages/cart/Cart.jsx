import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import CartItem from "./CartItem";
import { AuthContext } from "../../context/AuthContext";

const Cart = () => {
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState('')
    const { mernAuth } = useContext(AuthContext)

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/cart', {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${mernAuth?.token}`
                    }
                })
                console.log(res.data);
                if (res.data) {
                    setTotal(res.data.total);
                    setCart(res.data.products);
                } else {
                    setTotal(0);
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

    return (
        <>
            <Navbar />
            <section className="py-24 relative">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">

                    <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Shopping Cart
                    </h2>
                    <div className="flex flex-col gap-9">
                        {
                            cart?.length > 0 && cart?.map((item) => (
                                <CartItem item={item} key={item._id} />
                            ))
                        }
                    </div>
                    <div className="flex justify-between items-center">
                        <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full mb-10">Subtotal</h5>
                        <h6 className="font-manrope font-bold text-3xl lead-10 text-primary">${total}</h6>
                    </div>
                    <button
                        className="rounded-full py-4 px-6 bg-primary text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700 ">Checkout</button>

                </div>

            </section>
        </>
    );
};

export default Cart;