import { CiShoppingCart } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";

import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { mernAuth, setMernAuth } = useContext(AuthContext)
    const { cart } = useContext(CartContext)

    const navigate = useNavigate()

    const logout = () => {
        // signOut(auth);
        setMernAuth({
            ...mernAuth,
            user: null,
            token: ''
        })
        localStorage.removeItem('userId')
        localStorage.removeItem('auth')
        navigate('/login')
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const activeLink = 'text-primary font-bold flex items-center px-4 -mb-1 text-xl'
    return (
        <div>
            <header className="p-4">
                <div className="container flex justify-between h-16 mx-auto">
                    <div className="flex gap-10">
                        <Link to='/' className="flex items-center p-2 font-anton text-xl">
                            DecorMind
                        </Link>
                        <ul className="items-stretch hidden space-x-3 lg:flex text-lg">
                            <li className="flex">
                                <NavLink to='/' className={({ isActive }) => (isActive ? activeLink : 'font-normal text-black flex items-center px-4 -mb-1')}>Home</NavLink>
                            </li>
                            <li className="flex">
                                <NavLink to='/allProducts' className={({ isActive }) => (isActive ? activeLink : 'font-normal text-black flex items-center px-4 -mb-1')}>Products</NavLink>
                            </li>

                        </ul>
                    </div>
                    <div className="gap-10  hidden lg:flex">

                        <ul className="items-stretch hidden space-x-3 lg:flex text-2xl">
                            <li className="flex">
                                <Link to='/' className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-3xl relative">
                                    <div className="absolute top-4 right-3 bg-red-600 px-1 rounded-full text-xs text-white">
                                        {cart.length}
                                    </div>
                                    <CiShoppingCart />
                                </Link>
                            </li>
                            <li className="flex">
                                <Link to='/signUp' className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-primary border-blue-600 text-2xl">
                                    <BsPerson />
                                </Link>
                            </li>
                            <li>{mernAuth.user ? <button className="inline-flex mt-2 border-0 py-2 px-6 focus:outline-none rounded text-lg bg-primary" onClick={logout}>Sign out</button> : <button className='inline-flex text-primary btn btn-secondary border-0 py-2 mt-2 px-6 focus:outline-none hover:bg-primary hover:text-secondary rounded text-lg font-OpenSans'>
                                <NavLink to='/login'>Login</NavLink>
                            </button>}</li>
                        </ul>
                    </div>
                    {/* <div className="items-center flex-shrink-0 hidden lg:flex">
                        <button className="px-8 py-3 font-semibold rounded bg-blue-600 text-gray-50">Log in</button>
                    </div> */}
                    <button className="p-4 lg:hidden" onClick={toggleMobileMenu}>
                        <BiMenuAltRight size={24} />
                    </button>
                </div>
                {isMobileMenuOpen && (
                    <div className="lg:hidden">
                        <ul className="flex flex-col items-center space-y-3 mt-4">
                            <li className="flex">
                                <NavLink to='/' className={({ isActive }) => (isActive ? activeLink : 'font-normal text-black flex items-center px-4 -mb-1 text-xl')}>Home</NavLink>
                            </li>
                            <li className="flex">
                                <NavLink to='/allProducts' className={({ isActive }) => (isActive ? activeLink : 'font-normal text-black flex items-center px-4 -mb-1 text-xl')}>Products</NavLink>
                            </li>
                            <li className="flex">
                                <Link to='/cart' className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-3xl relative">
                                    <div className="absolute top-0 right-3 bg-red-600 px-1 rounded-full text-xs text-white">
                                        {cart.length}
                                    </div>
                                    <CiShoppingCart />
                                </Link>
                            </li>
                            <li className="flex">
                                <Link to='/signUp' className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-primary border-blue-600 text-2xl">
                                    <BsPerson />
                                </Link>
                            </li>
                            <li>{mernAuth.user ? <button className="inline-flex mt-2 border-0 py-2 px-6 focus:outline-none bg-primary rounded text-lg" onClick={logout}>Sign out</button> : <button className='inline-flex text-primary btn btn-secondary border-0 py-2 mt-2 px-6 focus:outline-none hover:bg-primary hover:text-secondary rounded text-lg font-OpenSans'>
                                <NavLink to='/login'>Login</NavLink>
                            </button>}</li>
                        </ul>
                    </div>
                )}
            </header>
        </div>
    );
};

export default Navbar;