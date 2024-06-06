/* eslint-disable react/prop-types */

const AllProduct = ({ product }) => {
    return (
        <div className="p-6 flex flex-col justify-center items-center gap-1">
            <img src={product.image} alt="" className="w-56 h-56 object-contain" />
            <h1>{product.name}</h1>
            <h1>{product.price}</h1>
            <button className="bg-primary rounded-md py-2 px-5 w-28 text-sm">Add to cart</button>
        </div>
    );
};

export default AllProduct;