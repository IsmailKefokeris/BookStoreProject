import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import BackButton from "../components/backButton";
import Spinner from "../components/Spinner";
import NavBar from "../components/NavBar";

import { useSnackbar } from "notistack";

//DeleteBook
const DeleteBook = () => {
    const [responseMessage, setResponse] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { id } = useParams();

    const serverURL =
        import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

    // const serverURL = import.meta.env.VITE_SERVER_URL || "http://13.40.226.37";

    const handleDelete = () => {
        setLoading(true);
        axios
            .delete(`${serverURL}/books/${id}`)
            .then((response) => {
                setResponse(response.data.message);
                // alert(response.data.message);
                setLoading(false);
                enqueueSnackbar("Book Deleted Successfully!", {
                    variant: "success",
                });
                navigate(`/`);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                enqueueSnackbar("Error Deleting Book!", { variant: "error" });
            });
    };

    return (
        <div className="p-4">
            <NavBar />
            <BackButton />
            <h1 className="text-3xl my-4">Delete Book</h1>
            {loading ? <Spinner /> : ""}
            <div className="flex flex-col items-center border-2 rounded-xl w-[600px] mx-auto p-8">
                <h3 className="text-xl">
                    Are you sure you want to delete this book
                </h3>

                <button
                    className="p-4 bg-red-600 text-white m-8 w-full"
                    onClick={handleDelete}
                >
                    Yes, Delete!
                </button>
            </div>
        </div>
    );
};

export default DeleteBook;
