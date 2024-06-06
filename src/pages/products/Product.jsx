/* eslint-disable react/prop-types */

import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Product = ({ product }) => {
    const { mernAuth } = useContext(AuthContext)

    const handleSubmit = async (id) => {
        console.log(id);
        try {
            const res = await axios.post('http://localhost:5000/api/cart/addToCart', {
                productId: id,
                quantity: 1,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${mernAuth?.token}`
                }
            })
            console.log(res.data); // Log the entire response data to inspect it
            const data = res.data;
            console.log("Cart updated:", data);

            return data
        } catch (error) {
            console.error("Error adding to cart", error);
        }
    }
    return (
        <div className="p-6 flex flex-col justify-center items-center gap-1">
            <img src={product.image} alt="" className="w-56 h-56 object-contain" />
            <h1>{product.name}</h1>
            <h1>{product.price}</h1>
            <button className="bg-primary rounded-md py-2 px-5 w-28 text-sm" onClick={() => handleSubmit(product._id)}>Add to cart</button>
        </div>
    );
};

export default Product;