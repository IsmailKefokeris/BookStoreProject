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

    const [files, setFiles] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    var url;

    // const serverURL =
    //     import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

    const serverURL =
        import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const fileChangeHandler = (e) => {
        setFiles(e.target.files);
    };

    // console.log("FILES: ", files);

    const handleSubmit = async () => {
        setLoading(true);

        // RETRIEVE IMAGES FROM FORM

        const data = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append("image", files[i]);
        }

        // TODO: UPLOAD IMAGES TO S3

        const response = await axios
            .post(`${serverURL}/upload/upload-multiple`, data)
            .then((response) => {
                enqueueSnackbar(response.data.message, {
                    variant: "success",
                });

                url = response.data.results.Locations;
            })
            .catch((error) => {
                console.log(error.message);
                return enqueueSnackbar("Error Uploading Images!", {
                    variant: "error",
                });
            });

        console.log("URL: ", url);

        // CREATE BOOK
        axios
            .post(`${serverURL}/books`, {
                title: title,
                author: author,
                publishYear: publishYear,
                quantity: quantity,
                price: price,
                images: url,
            })
            .then((res) => {
                setLoading(false);
                enqueueSnackbar("Book Created Successfully!", {
                    variant: "success",
                });
                navigate(`/books/details/${res.data._id}`);
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar("Error Creating Book!", {
                    variant: "error",
                });
                setError(error.response.data.message);
            });

        // axios
        //     .post(`${serverURL}/upload/upload-multiple`, data)
        //     .then((response) => {
        //         enqueueSnackbar(response.data.message, {
        //             variant: "success",
        //         });

        //         // CREATE BOOK
        //         axios
        //             .post(`${serverURL}/books`, {
        //                 title: title,
        //                 author: author,
        //                 publishYear: publishYear,
        //                 quantity: quantity,
        //                 price: price,
        //                 images: response.data.results.Locations,
        //             })
        //             .then((res) => {
        //                 setLoading(false);
        //                 enqueueSnackbar("Book Created Successfully!", {
        //                     variant: "success",
        //                 });
        //                 navigate(`/books/details/${res.data._id}`);
        //             })
        //             .catch((error) => {
        //                 setLoading(false);
        //                 enqueueSnackbar("Error Creating Book!", {
        //                     variant: "error",
        //                 });
        //                 setError(error.response.data.message);
        //             });
        //         // setImageURL(response.data.results.Locations);
        //     })
        //     .catch((error) => {
        //         console.log(error.message);
        //         return enqueueSnackbar("Error Uploading Images!", {
        //             variant: "error",
        //         });
        //     });

        // CREATE BOOK

        // axios
        //     .post(`${serverURL}/books`, {
        //         title: title,
        //         author: author,
        //         publishYear: publishYear,
        //         quantity: quantity,
        //         price: price,
        //         images: [...imageURL],
        //     })
        //     .then((response) => {
        //         setLoading(false);
        //         enqueueSnackbar("Book Created Successfully!", {
        //             variant: "success",
        //         });
        //         navigate(`/books/details/${response.data._id}`);
        //     })
        //     .catch((error) => {
        //         setLoading(false);
        //         enqueueSnackbar("Error Creating Book!", { variant: "error" });
        //         setError(error.response.data.message);
        //     });
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

                        <div className="my-4">
                            <label
                                className="block text-gray-700 text-xl font-bold mb-2 mr-4"
                                htmlFor="image"
                            >
                                Images
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="image"
                                name="image"
                                type="file"
                                multiple
                                onChange={fileChangeHandler}
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
