import { PaymentElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const Checkoutform2 = ({ elements, stripe, clientSecret }) => {
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    console.log(stripe);

    useEffect(() => {
        if (!stripe) {
            return;
        }


        // const clientSecret = new URLSearchParams(window.location.search).get(
        //     "client_secret"
        // );


        // if (!clientSecret) {
        //     return;
        // }


        // Extract PaymentIntent ID and client secret from the URL
        const [_, paymentIntentId, secret] = clientSecret?.split("_");


        stripe.retrievePaymentIntent(`${stripe}_secret_${'3POvHMC6jSgZhdi80gdspUmw'}`)
            .then(({ paymentIntent }) => {

                switch (paymentIntent.status) {
                    case "succeeded":
                        setMessage("Payment succeeded!");
                        break;
                    case "processing":
                        setMessage("Your payment is processing.");
                        break;
                    case "requires_payment_method":
                        setMessage("Your payment was not successful, please try again.");
                        break;
                    default:
                        setMessage("Something went wrong.");
                        break;
                }

            }
            );
    }, [stripe]);


    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }


        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:5173/success",
            },
        });





        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error && (error.type === "card_error" || error.type === "validation_error")) {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }


        setIsLoading(false);




    };


    const paymentElementOptions = {
        layout: "tabs",
    };
    return (
        <div className="payment">
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button className=" mt-8 text-white bg-indigo-500 border-0 py-2 px-8 w-full focus:outline-none hover:bg-indigo-600 rounded text-lg" disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
};

export default Checkoutform2;