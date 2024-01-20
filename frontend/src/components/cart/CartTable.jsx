import React from "react";
import PropTypes from "prop-types";

import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { IoCartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../../state/cart/cartSlice";

const CartTable = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <div className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl flex overflow-auto">
            <div className="box-border h-32 w-32 p-4 border-4 border-black m-auto">
                {product.author}
            </div>

            <div className="flex flex-col justify-between items-start gap-y-5 p-4">
                <h1>{product.title}</h1>
                <h2>£{product.price}</h2>
                <h2>Quantity: {product.buyQuantity}</h2>
                <button
                    className="bg-red-500 justify-center hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => dispatch(removeProduct(product))}
                >
                    Remove
                </button>
            </div>

            <div className="flex flex-col justify-between items-start gap-y-5 p-4">
                <h1>{product.price * product.buyQuantity}</h1>
            </div>
        </div>
    );
};

CartTable.propTypes = {
    product: PropTypes.object.isRequired,
};

export default CartTable;
