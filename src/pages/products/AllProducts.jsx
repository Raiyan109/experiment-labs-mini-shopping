import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import AllProduct from "./AllProduct";
import Loading from "../../components/Loading";

const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const res = await axios.get(`https://experiment-labs-mini-shopping-be.vercel.app/api/products?searchTerm=${searchTerm}`)
            // console.log(res);
            setProducts(res.data.data)
            setIsLoading(false)
        })()
    }, [searchTerm])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="">
            <Navbar />
            <h1 className="text-center font-anton text-4xl pb-10">All Products</h1>
            <div className="flex justify-center items-center">
                <div className="relative">
                    <label className="sr-only"> Search </label>
                    <input
                        type="text"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        id="Search"
                        placeholder="What are you looking for?"
                        className="w-full  rounded-md border border-primary py-3 px-5 shadow-xl sm:text-sm"
                    />

                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    {
                        products.map((product) => (
                            <AllProduct product={product} key={product._id} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default AllProducts;