import React from "react";
import NavBar from "../components/NavBar";
import CartTable from "../components/cart/CartTable";
import { FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearCart } from "../state/cart/cartSlice";
import { useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const ShoppingCart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const serverURL =
        import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

    // const serverURL = import.meta.env.VITE_SERVER_URL || "http://13.40.226.37";

    const STRIPE_KEY =
        "pk_test_51OUDlLB0Nb68w01k5N1oCiHLwd8BfW1Dtg9u13rgjIMAApwO0V6VFZBzDnwNZMH1Y3mxGKItOBgztegMkdzCzsPF003c5oH8q0";

    const stripe = useStripe();
    const stripePromise = loadStripe(STRIPE_KEY);

    const handleCheckout = async () => {
        console.log(Math.floor(cart.total * 100));

        console.log(cart.products);

        const lineItems = cart.products.map((product) => {
            return {
                price_data: {
                    currency: "GBP",
                    product_data: {
                        name: product.title,
                    },
                    unit_amount: Math.floor(product.price * 100),
                },
                quantity: product.buyQuantity,
            };
        });

        const { data } = await axios.post(`${serverURL}/payments/checkout`, {
            line_items: lineItems,
        });

        const stripe = await stripePromise;

        await stripe.redirectToCheckout({ sessionId: data.id });
    };

    // const handleCheckout = async () => {
    //     console.log(Math.floor(cart.total * 100));
    //     console.log("checkout");
    //     // Create Payment intent
    //     axios
    //         .post(`${serverURL}/payments/intents`, {
    //             amount: Math.floor(cart.total * 100),
    //         })
    //         .then(async (response) => {
    //             console.log(response.data.paymentIntent);
    //             // Initialise the Payment Sheet
    //             const initResponse = await stripe.initPaymentSheet({
    //                 merchantDisplayName: "Dr Stef Keris",
    //                 paymentIntentClientSecret: response.data.paymentIntent,
    //             });

    //             if (initResponse.error) {
    //                 console.log(initResponse.error);
    //                 return;
    //             }

    //             // Present the Payment Sheet from Stripe

    //             await stripe.presentPaymentSheet();

    //             dispatch(clearCart);
    //         })
    //         .catch((error) => {
    //             console.log("ERROR: ", error);
    //             return;
    //         });

    //     // If Payment good then create the order...
    // };

    return (
        <div className="p-4">
            <NavBar />
            <div className="grid grid-cols-2 gap-4 p-6">
                <div className=" col-start-1 col-span-1">
                    <h1 className="font-bold p-3 text-3xl font-serif">
                        My Cart
                    </h1>
                    {cart.products.map((prods) => {
                        return <CartTable key={prods._id} product={prods} />;
                    })}
                </div>
                <div className=" col-start-2 col-span-1">
                    <div className="p-6 m-6">
                        <h1>Order Summary</h1>
                        <h2>Subtotal: -------</h2>
                        <h2>Delivery: -------</h2>
                    </div>
                    <div className="p-6 m-6 flex flex-col">
                        <h1 className="m-5">Total: -------</h1>
                        <button
                            className="bg-blue-500 justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>
                        <div className="flex-row flex m-auto p-4">
                            <FaLock className="m-1" />
                            <h1>Secure Checkout</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
