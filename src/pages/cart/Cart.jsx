import { useContext } from "react";
import Navbar from "../../components/Navbar";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Loading from "../../components/Loading";

const Cart = () => {
    const { cart, cartTotal, isLoading } = useContext(CartContext)

    if (isLoading) {
        return <div>
            <Navbar />
            <section className=" relative">
                <Link to='/allProducts' className="bg-primary rounded-md py-2 w-36 text-sm absolute top-0 left-5 lg:left-10 xl:left-80 flex justify-center items-center font-semibold">Continue shopping</Link>
            </section>
            <Loading />
        </div>
    }

    return (
        <>
            <Navbar />
            <section className="py-24 relative">
                <Link to='/allProducts' className="bg-primary rounded-md py-2 w-36 text-sm absolute top-0 left-5 lg:left-10 xl:left-80 flex justify-center items-center font-semibold">Continue shopping</Link>
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
                    {
                        cart?.length > 0 && (
                            <div className="flex justify-between items-center">
                                <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full mb-10">Subtotal</h5>
                                <h6 className="font-manrope font-bold text-3xl lead-10 text-primary">${Math.round(cartTotal)}</h6>
                            </div>
                        )
                    }
                    {
                        cart?.length > 0 ? (
                            <Link to='/payment'
                                className="rounded-full py-4 px-6 bg-primary text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700 ">Checkout</Link>
                        ) :
                            (
                                <div>
                                    <h1 className="text-center text-2xl pt-5 text-gray-600">No Items to Checkout.</h1>
                                </div>
                            )
                    }

                </div>

            </section>
        </>
    );
};

export default Cart;