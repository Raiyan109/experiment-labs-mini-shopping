import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./Product";
import Navbar from "../../components/Navbar";

const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        (async () => {
            const res = await axios.get(`http://localhost:5000/api/products?searchTerm=${searchTerm}`)
            // console.log(res);
            setProducts(res.data.data)
        })()
    }, [searchTerm])
    console.log(searchTerm);
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
                            <Product product={product} key={product._id} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default AllProducts;