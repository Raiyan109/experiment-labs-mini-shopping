import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        (async () => {
            const res = await axios.get('https://experiment-labs-mini-shopping-be.vercel.app/api/products')
            // console.log(res);
            setProducts(res.data.data)
        })()
    }, [])
    return (
        <div className="pt-20">
            <h1 className="text-center font-anton text-4xl pb-10">Products</h1>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-3 justify-center">
                        <h1 className="text-xl font-bold max-w-[190px]">Best Selling Home Decors</h1>
                        <h1 className="text-sm font-normal text-gray-500 max-w-[100px]">Buy your favorite home decors</h1>
                        <Link to='/allProducts' className="bg-primary rounded-md py-2 px-5 w-28">See more</Link>
                    </div>
                    {
                        products.slice(0, 3).map((product) => (
                            <Product product={product} key={product._id} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Products;