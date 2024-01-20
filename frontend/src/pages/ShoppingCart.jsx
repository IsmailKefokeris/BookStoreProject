import React from "react";
import NavBar from "../components/NavBar";
import CartTable from "../components/cart/CartTable";
import { FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const ShoppingCart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

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
                        <button className="bg-blue-500 justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
