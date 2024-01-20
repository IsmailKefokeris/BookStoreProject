import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { IoCartSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addProduct } from "../../state/cart/cartSlice";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

import PropTypes from "prop-types";

const BookTable = ({ books }) => {
    const dispatch = useDispatch();
    return (
        <table className="w-full border-separate border-spacing-2">
            <thead>
                <tr>
                    <th className="border border-slate-600 rounded-md">No</th>
                    <th className="border border-slate-600 rounded-md">
                        Title
                    </th>
                    <th className="border border-slate-600 rounded-md max-md:hidden">
                        Author
                    </th>
                    <th className="border border-slate-600 rounded-md max-md:hidden">
                        Publish Year
                    </th>
                    <th className="border border-slate-600 rounded-md max-md:hidden">
                        Quantity
                    </th>
                    <th className="border border-slate-600 rounded-md max-md:hidden">
                        Price
                    </th>
                    <th className="border border-slate-600 rounded-md">
                        Operations
                    </th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => {
                    return (
                        <tr key={book._id} className="h-8">
                            <td className="border border-slate-700 rounded-md text-center">
                                {index + 1}
                            </td>
                            <td className="border border-slate-700 rounded-md text-center">
                                {book.title}
                            </td>
                            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                                {book.author}
                            </td>
                            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                                {book.publishYear}
                            </td>
                            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                                {book.quantity}
                            </td>
                            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                                {book.price}
                            </td>
                            <td className="border border-slate-700 rounded-md text-center">
                                <div className="flex justify-center gap-x-4">
                                    <Link to={`/books/details/${book._id}`}>
                                        <BsInfoCircle className="text-2xl text-green-800" />
                                    </Link>
                                    <Link to={`/books/edit/${book._id}`}>
                                        <AiOutlineEdit className="text-2xl text-yellow-600" />
                                    </Link>
                                    <Link to={`/books/delete/${book._id}`}>
                                        <MdOutlineDelete className="text-2xl text-red-600" />
                                    </Link>
                                    <IoCartSharp
                                        className="text-blue-300 text-2xl hover:text-black cursor-pointer"
                                        onClick={() =>
                                            dispatch(addProduct(book))
                                        }
                                    />
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

BookTable.propTypes = {
    books: PropTypes.array.isRequired,
};

export default BookTable;
