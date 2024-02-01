import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import NavBar from "../components/NavBar";
import BookCard from "../components/home/BookCard";
import BookTable from "../components/home/BookTable";

import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

import { useSelector } from "react-redux";

const Home = () => {
    const cart = useSelector((state) => state.cart);

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState();

    // const serverURL =
    //     import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

    const serverURL = import.meta.env.VITE_SERVER_URL || "http://13.40.226.37";

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${serverURL}/books`)
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);
    return (
        <div className="p-4">
            <NavBar />
            <div className="p-4 flex flex-row justify-center items-center gap-x-4">
                <button
                    className="p-4 bg-sky-300 hover:bg-sky-600 rounded-lg"
                    onClick={() => setShowType("table")}
                >
                    Table
                </button>

                <button
                    className="p-4 bg-sky-300 hover:bg-sky-600 rounded-lg"
                    onClick={() => setShowType("card")}
                >
                    Card
                </button>
            </div>

            <div className="flex justify-between items-center">
                <h1 className="font-bold p-3 text-3xl font-serif">
                    Books List
                </h1>

                <Link to="/books/create">
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : showType == "table" ? (
                <BookTable books={books} />
            ) : (
                <BookCard books={books} />
            )}
        </div>
    );
};

export default Home;
