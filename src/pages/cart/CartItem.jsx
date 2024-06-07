/* eslint-disable react/prop-types */
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ item }) => {
    const { mernAuth } = useContext(AuthContext)
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()

    const handleSubmit = async (id) => {
        console.log(id);
        try {
            const res = await axios.delete(`https://experiment-labs-mini-shopping-be.vercel.app/api/cart/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${mernAuth?.token}`
                }
            })

            const data = res.data;
            MySwal.fire({
                title: "Product removed from cart successfully",
                text: "Redirecting to Cart page",
                icon: "success"
            }).then(function () {
                window.location.reload();
            })
            navigate('/cart')

            return data
        } catch (error) {
            console.error("Error removing from cart", error);
        }
    }
    return (
        <div className="border border-gray-500 rounded-3xl p-9 w-full space-y-4">
            <div className="flex justify-between items-center">
                <h1>{item?.name}</h1>
                <button className="rounded-full bg-primary p-2" onClick={() => handleSubmit(item?.productId)}>Remove</button>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex gap-3">
                    <button className="rounded-full bg-primary w-7 h-7 flex justify-center items-center">-</button>
                    <div className="rounded-full bg-primary w-7 h-7 flex justify-center items-center">
                        {item?.quantity}
                    </div>
                    <button className="rounded-full bg-primary w-7 h-7 flex justify-center items-center">+</button>
                </div>
                <h1 className="font-bold">{item?.price}</h1>
            </div>
        </div>
    );
};

export default CartItem;