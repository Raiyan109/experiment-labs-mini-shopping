import { BiSearch } from 'react-icons/bi'
import { CiShoppingCart } from "react-icons/ci";
import { BsFillPersonFill } from 'react-icons/bs'
import { BiMenuAltRight } from "react-icons/bi";

import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react';
const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const activeLink = 'text-primary font-bold flex items-center px-4 -mb-1'
    return (
        <div>
            <header className="p-4">
                <div className="container flex justify-between h-16 mx-auto">
                    <div className="flex gap-10">
                        <a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2 font-anton text-xl">
                            DecorMind
                        </a>
                        <ul className="items-stretch hidden space-x-3 lg:flex text-lg">
                            <li className="flex">
                                <NavLink to='/' className={({ isActive }) => (isActive ? activeLink : 'font-normal text-black flex items-center px-4 -mb-1')}>Home</NavLink>
                            </li>
                            <li className="flex">
                                <NavLink to='/products' className={({ isActive }) => (isActive ? activeLink : 'font-normal text-black flex items-center px-4 -mb-1')}>Products</NavLink>
                            </li>

                        </ul>
                    </div>
                    <div className="gap-10  hidden lg:flex">

                        <ul className="items-stretch hidden space-x-3 lg:flex text-2xl">
                            <li className="flex">
                                <Link to='/' className="flex items-center px-4 -mb-1 border-b-2 border-transparent">
                                    <CiShoppingCart />
                                </Link>
                            </li>
                            <li className="flex">
                                <Link to='/signUp' className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-primary border-blue-600">
                                    <BsFillPersonFill />
                                </Link>
                            </li>

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
                            <li>
                                <Link to='/' className="flex items-center px-4 -mb-1 border-b-2 border-transparent">Home</Link>
                            </li>
                            <li>
                                <Link to='/products' className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-blue-600 border-blue-600">Products</Link>
                            </li>
                            <li>
                                <Link to='/cart' className="flex items-center px-4 -mb-1 border-b-2 border-transparent">
                                    <CiShoppingCart />
                                </Link>
                            </li>
                            <li>
                                <Link to='/signUp' className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-blue-600 border-blue-600">
                                    <BsFillPersonFill />
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </header>
        </div>
    );
};

export default Navbar;