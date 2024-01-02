import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import BackButton from "../components/backButton";
import NavBar from "../components/NavBar";

import { useSnackbar } from "notistack";


const ShowBook = () => {
    const [book, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const serverURL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

    const { id } = useParams();

    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${serverURL}/books/${id}`)
            .then((response) => {
                setBooks(response.data);
                setLoading(false);
                enqueueSnackbar("Book Loaded!", {variant: "success"})
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                enqueueSnackbar("Error loading book!", {variant: "error"})

            });
    }, []);
    return (
        <div className="p-4">
            <NavBar />
            <BackButton />

            <h1 className="text-3xl my-4"> Show Book </h1>

            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Id</span>
                        <span>{book._id}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Title
                        </span>
                        <span>{book.title}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Author
                        </span>
                        <span>{book.author}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Publish Year
                        </span>
                        <span>{book.publishYear}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Create Time
                        </span>
                        <span>{new Date(book.createdAt).toString()}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Last Updated Time
                        </span>
                        <span>{new Date(book.updatedAt).toString()}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowBook;
