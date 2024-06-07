
import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { mernAuth, setMernAuth } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // setLoading(true);
        const res = await axios.post('https://experiment-labs-mini-shopping-be.vercel.app/api/users/signin', {
            email,
            password,
        })

        // setLoading(false);
        navigate('/')
        const data = await res.data
        // console.log(data);
        setMernAuth({
            ...mernAuth,
            user: data.user,
            token: data.access_token
        })
        localStorage.setItem('userId', data.user._id)
        localStorage.setItem('auth', JSON.stringify(res.data))
        return data

    }
    return (
        <>
            <Navbar />
            <div className="pt-10">
                <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="px-6 py-4">


                        <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

                        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login</p>

                        <form onSubmit={handleSubmit}>

                            <div className="w-full mt-4">
                                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address" aria-label="Email Address" />
                            </div>

                            <div className="w-full mt-4">
                                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password" aria-label="Password" />
                            </div>

                            <div className="flex items-center justify-between mt-4">


                                <button className="px-6 py-2 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                    type='submit'
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                        <span className="text-sm text-gray-600 dark:text-gray-200">Do not have an account? </span>

                        <Link to='/signUp' className="mx-2 text-sm font-bold text-black dark:text-blue-400 hover:underline">Register</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;