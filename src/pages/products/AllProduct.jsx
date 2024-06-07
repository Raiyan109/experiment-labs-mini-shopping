/* eslint-disable react/prop-types */
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
const AllProduct = ({ product }) => {
    const { mernAuth } = useContext(AuthContext)
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Fetch cart items on mount
        const fetchCartItems = async () => {
            try {
                const res = await axios.get('https://experiment-labs-mini-shopping-be.vercel.app/api/cart', {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${mernAuth?.token}`
                    }
                });

                setCartItems(res.data.products.map(product => product.productId));
            } catch (error) {
                console.error("Error fetching cart items", error);
            }
        };
        fetchCartItems();
    }, [mernAuth?.token]);

    const handleSubmit = async (id) => {
        console.log(id);
        try {
            const res = await axios.post('https://experiment-labs-mini-shopping-be.vercel.app/api/cart/addToCart', {
                productId: id,
                quantity: 1,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${mernAuth?.token}`
                }
            });

            const data = res.data;
            MySwal.fire({
                title: "Product added to cart",
                text: "Redirecting to Cart page",
                icon: "success"
            });
            setCartItems([...cartItems, id]); // Add item to cartItems state
            navigate('/cart');

            return data;
        } catch (error) {
            console.error("Error adding to cart", error);
        }
    };

    const isAddedToCart = cartItems.includes(product._id);

    return (
        <div className="p-6 flex flex-col justify-center items-center gap-1">
            <img src={product.image} alt="" className="w-56 h-56 object-contain" />
            <h1>{product.name}</h1>
            <h1>${product.price}</h1>
            <button className={`${isAddedToCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary'} rounded-md py-2 px-5 w-28 text-sm`} onClick={() => handleSubmit(product._id)} disabled={isAddedToCart}>{isAddedToCart ? "Added" : "Add to cart"}</button>
        </div>
    );
};

export default AllProduct;