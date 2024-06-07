import { useContext, useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

import InjectCheck from "./InjectCheck";
import { CartContext } from "../../context/CartContext";

const Payment = () => {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSec, setClientSec] = useState("");
    const { cartTotal } = useContext(CartContext)
    const { mernAuth } = useContext(AuthContext);


    useEffect(() => {
        (async () => {
            const res = await axios.get('https://experiment-labs-mini-shopping-be.vercel.app/api/orders/config')
            setStripePromise(loadStripe(res.data.publishableKey));
        })()
    }, [])

    useEffect(() => {

        const createOrder = async () => {
            try {

                const res = await axios.post('https://experiment-labs-mini-shopping-be.vercel.app/api/orders/createOrder', {
                    amount: cartTotal
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${mernAuth?.token}`
                    }
                });
                console.log(res.data.data);
                setClientSec(res.data.data);
            } catch (error) {
                console.error("Error creating order", error);
            }
        };

        if (mernAuth?.token) {
            createOrder();
        }
    }, [])
    console.log(clientSec);
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret: clientSec,
        appearance,
    };

    return (
        <div>
            <h1 className="font-anton text-center text-5xl py-20">Payment</h1>
            {clientSec && (
                <Elements stripe={stripePromise} options={options}>
                    <InjectCheck />
                    {/* <InjectCheck clientSecret={clientSec} /> */}
                </Elements>
            )}

        </div>
    );
};


export default Payment;