import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import BackButton from "../components/backButton";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import axios from "axios";

import { useSnackbar } from "notistack";

const CreateBooks = () => {
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState();
    const [publishYear, setPublishYear] = useState();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    // const serverURL =
    //     import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

    const serverURL = import.meta.env.VITE_SERVER_URL || "http://13.40.226.37";

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = () => {
        setLoading(true);
        axios
            .post(`${serverURL}/books`, {
                title: title,
                author: author,
                publishYear: publishYear,
                quantity: quantity,
                price: price,
            })
            .then((response) => {
                console.log(response);
                setLoading(false);
                enqueueSnackbar("Book Created Successfully!", {
                    variant: "success",
                });
                navigate(`/books/details/${response.data._id}`);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                enqueueSnackbar("Error Creating Book!", { variant: "error" });
                setError(error.response.data.message);
            });
    };

    return (
        <div className="p-4">
            <NavBar />

            {loading ? (
                <Spinner />
            ) : (
                <div className="p-4 flex justify-between items-center flex-col">
                    <div className="flex justify-between items-center gap-3">
                        <BackButton />

                        <h1 className="text-3xl my-4"> Create Book </h1>
                    </div>

                    <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
                        <div className="my-4">
                            <label
                                className="block text-gray-700 text-xl font-bold mb-2 mr-4"
                                htmlFor="title"
                            >
                                Title
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="title"
                                type="text"
                                placeholder="Book Title"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="my-4">
                            <label
                                className="block text-gray-700 text-xl font-bold mb-2 mr-4"
                                htmlFor="author"
                            >
                                Author
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="author"
                                type="text"
                                placeholder="Author"
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>

                        <div className="my-4">
                            <label
                                className="block text-gray-700 text-xl font-bold mb-2 mr-4"
                                htmlFor="quantity"
                            >
                                Quantity
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="quantity"
                                type="number"
                                placeholder="1"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>

                        <div className="my-4">
                            <label
                                className="block text-gray-700 text-xl font-bold mb-2 mr-4"
                                htmlFor="quantity"
                            >
                                Price
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="quantity"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className="my-4">
                            <label
                                className="block text-gray-700 text-xl font-bold mb-2 mr-4"
                                htmlFor="publishYear"
                            >
                                Publish Year
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="publishYear"
                                type="number"
                                min="1500"
                                max="2024"
                                step="1"
                                onChange={(e) => setPublishYear(e.target.value)}
                            />
                        </div>

                        <p id="formError" className="text-red-700 font-bold">
                            {error}
                        </p>

                        <Link
                            onClick={handleSubmit}
                            className="flex justify-end"
                            type="submit"
                        >
                            <TiTick className="text-2xl text-green-800" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateBooks;
