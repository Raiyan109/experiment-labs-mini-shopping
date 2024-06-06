import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./Product";

const AllProducts = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        (async () => {
            const res = await axios.get('http://localhost:5000/api/products')
            // console.log(res);
            setProducts(res.data.data)
        })()
    }, [])
    return (
        <div className="pt-20">
            <h1 className="text-center font-anton text-4xl pb-10">Products</h1>
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