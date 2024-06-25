/* eslint-disable react/prop-types */
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const { updateCartItemQuantity, removeFromCart } = useCart();


    const handleRemove = async (id) => {
        try {
            await removeFromCart(id);
            MySwal.fire({
                title: "Product removed from cart successfully",
                text: "Redirecting to Cart page",
                icon: "success"
            }).then(() => {
                navigate('/cart');
            });
        } catch (error) {
            console.error("Error removing from cart", error);
        }
    };

    const handleIncrement = async (id) => {
        try {
            await updateCartItemQuantity(id, item.quantity + 1);
        } catch (error) {
            console.error("Error updating cart item quantity", error);
        }
    };

    const handleDecrement = async (id) => {
        try {
            if (item.quantity > 1) {
                await updateCartItemQuantity(id, item.quantity - 1);
            }
        } catch (error) {
            console.error("Error updating cart item quantity", error);
        }
    };

    return (
        <div className="border border-gray-500 rounded-3xl p-9 w-full space-y-4">
            <div className="flex justify-between items-center">
                <h1>{item?.name}</h1>
                <button className="rounded-full bg-primary p-2" onClick={() => handleRemove(item?.productId)}>Remove</button>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex gap-3">
                    <button className="rounded-full bg-primary w-7 h-7 flex justify-center items-center" onClick={() => handleDecrement(item?.productId)}>-</button>
                    <div className="rounded-full bg-primary w-7 h-7 flex justify-center items-center">
                        {item?.quantity}
                    </div>
                    <button className="rounded-full bg-primary w-7 h-7 flex justify-center items-center" onClick={() => handleIncrement(item?.productId)}>+</button>
                </div>
                <h1 className="font-bold">${Math.round(item?.price * item?.quantity)}</h1>
            </div>
        </div>
    );
};

export default CartItem;