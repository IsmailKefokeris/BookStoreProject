import React from "react";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import BackButton from "../components/backButton";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";



const CreateBooks = () => {

    const handleSubmit = () => {
        return true;
    };

    return (
        <div className="p-4 flex justify-between items-center flex-col">
            <div className="flex justify-between items-center gap-3">
                <BackButton />

                <h1 className="text-3xl my-4"> Show Book </h1>
            </div>

            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
                <div className="my-4">
                    <label className="block text-gray-700 text-xl font-bold mb-2 mr-4" htmlFor="title">Title</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title"></input>
                </div>

                <div className="my-4">
                    <label className="block text-gray-700 text-xl font-bold mb-2 mr-4" htmlFor="author">Author</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="author" type="text" placeholder="Author Name"></input>
                </div>
                
                <div className="my-4">
                    <label className="block text-gray-700 text-xl font-bold mb-2 mr-4" htmlFor="publishYear">Title</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="publishYear" type="text" placeholder="Publish Year"></input>
                </div>

                <Link onClick={handleSubmit} className="flex justify-end">
                    <TiTick className="text-2xl text-green-800"/>
                </Link>
            </div>
        </div>
    );
};

export default CreateBooks;
