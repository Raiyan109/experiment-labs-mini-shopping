/* eslint-disable react/prop-types */
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
const AllProduct = ({ product }) => {
    const { mernAuth } = useContext(AuthContext)
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()

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
            })

            const data = res.data;
            MySwal.fire({
                title: "Product added to cart",
                text: "Redirecting to Cart page",
                icon: "success"
            })
            navigate('/cart')

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

export default AllProduct;