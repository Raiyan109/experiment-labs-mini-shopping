import { useContext, useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import InjectCheck from "./InjectCheck";

const stripeId = loadStripe('pk_test_51L1OriC6jSgZhdi8qkAiIGespYE6i96T7HuAWIKypgpRFOCfOhhRlqNPTLmInenVmKn5srcAjElwfRYf0oUEUT5E00NRA1jfwh')
const Payment = () => {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSec, setClientSec] = useState("");
    // const stripe = useStripe();
    // const elements = useElements();

    const { mernAuth } = useContext(AuthContext);


    // useEffect(() => {
    //     (async () => {
    //         const res = await axios.get('http://localhost:5000/api/orders/config')
    //         setStripePromise(loadStripe(res.data.publishableKey));
    //     })()
    // }, [])

    useEffect(() => {

        const createOrder = async () => {
            try {
                // const { paymentMethod } = await stripe.createPaymentMethod({
                //     type: 'card',
                //     card: elements.getElement(CardElement),
                // });
                const res = await axios.post('http://localhost:5000/api/orders/createOrder', {
                    amount: 100
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
            <h1>React Stripe and the Payment Element</h1>
            {clientSec && (
                <Elements stripe={stripeId} options={options}>
                    <InjectCheck />
                    {/* <InjectCheck clientSecret={clientSec} /> */}
                </Elements>
            )}

        </div>
    );
};


export default Payment;