
const CartItem = ({ item }) => {
    return (
        <div className="border border-gray-500 rounded-3xl p-9 w-full space-y-4">
            <div className="flex justify-between items-center">
                <h1>{item?.name}</h1>
                <button className="rounded-full bg-primary p-2">Remove</button>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex gap-3">
                    <button className="rounded-full bg-primary w-7 h-7 flex justify-center items-center">-</button>
                    <div className="rounded-full bg-primary w-7 h-7 flex justify-center items-center">
                        {item?.quantity}
                    </div>
                    <button className="rounded-full bg-primary w-7 h-7 flex justify-center items-center">+</button>
                </div>
                <h1 className="font-bold">{item?.price}</h1>
            </div>
        </div>
    );
};

export default CartItem;