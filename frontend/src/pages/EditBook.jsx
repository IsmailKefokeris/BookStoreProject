import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import BackButton from "../components/backButton";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import axios from "axios";

import { useSnackbar } from "notistack";

const EditBook = () => {
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [publishYear, setPublishYear] = useState();

    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    const [error, setError] = useState("");

    const serverURL =
        import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${serverURL}/books/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setPublishYear(response.data.publishYear);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                // alert("An Error has occured check console...")
                setLoading(false);
            });
    }, []);

    const handleSubmit = () => {
        setLoading(true);
        axios
            .put(`${serverURL}/books/${id}`, {
                title: title,
                author: author,
                publishYear: publishYear,
            })
            .then((response) => {
                console.log(response);
                setLoading(false);
                navigate(`/`);
                enqueueSnackbar("Book Updated Successfully!", {
                    variant: "success",
                });
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                setError(error.response.data.message);
                enqueueSnackbar("Error updating book!", { variant: "error" });
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

                        <h1 className="text-3xl my-4"> Edit Book </h1>
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
                                value={title}
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
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
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
                                value={publishYear}
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

export default EditBook;
