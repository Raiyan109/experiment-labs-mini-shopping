/* eslint-disable react/prop-types */
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useEffect, useState } from "react";
import { useCart } from '../../context/CartContext';
// import { useNavigate } from 'react-router-dom';
const AllProduct = ({ product }) => {
    const MySwal = withReactContent(Swal)
    // const navigate = useNavigate()
    const { cart, addToCart } = useCart();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        setCartItems(cart.map(item => item.productId));
    }, [cart]);

    const handleSubmit = async (id) => {
        console.log(id);
        await addToCart(id, 1);
        MySwal.fire({
            title: "Product added to cart",
            text: "Redirecting to Cart page",
            icon: "success"
        });
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