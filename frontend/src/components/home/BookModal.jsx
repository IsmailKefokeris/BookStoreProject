import React from "react";
import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModal = ({ book, onClose }) => {
    return (
        <div
            className="fixed 
    bg-black 
    bg-opacity-60 
    top-0 left-0 
    right-0 bottom-0 
    z-50 flex justify-center 
    items-center"
            onClick={onClose}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
            >
                <AiOutlineClose
                    className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
                    onClick={onClose}
                />

                <div className="flex justify-start items-center gap-x-2">
                    <PiBookOpenTextLight className="text-red-300 text-2xl" />
                    <h2 className="my-1">{book.title}</h2>
                </div>
                <div className="flex justify-start items-center gap-x-2">
                    <BiUserCircle className="text-red-300 text-2xl" />
                    <h2 className="my-1">{book.author}</h2>
                </div>
                <div className="flex justify-start items-center gap-x-2">
                    <h2 className="my-1">{book.price}</h2>
                </div>
                <h3 className="text-3xl font-bold p-2">Info</h3>
                <p className=" overflow-auto p-4 m-auto">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nemo, nobis asperiores labore, pariatur facilis voluptas
                    aliquam quas veniam tenetur veritatis ea magnam modi
                    adipisci doloremque. Tenetur, minima incidunt asperiores
                    ducimus repellendus ex aspernatur voluptate in, aliquid
                    recusandae saepe facere fugit veritatis aut, doloremque
                    reprehenderit perspiciatis labore blanditiis? Recusandae vel
                    eligendi quaerat dolorum, maxime quibusdam debitis minima
                    libero magni. Iste explicabo sint quis quasi? Reiciendis ab
                    tempora nisi perspiciatis ratione harum nihil voluptatum
                    corrupti natus ullam distinctio, quae fuga adipisci, maxime
                    in qui. Aspernatur, earum rem ex voluptate dolorum minima
                    minus sequi, architecto facilis nulla libero perspiciatis
                    corrupti? Assumenda ipsum voluptas ad suscipit sint
                    architecto, ab repellat totam dignissimos unde deserunt, et
                    iste consequuntur aliquam nisi sunt rerum soluta velit at?
                </p>

                <h2 className="w-fit px-4 m-4 py-1 bg-red-300 rounded-lg">
                    {book.publishYear}
                </h2>
            </div>
        </div>
    );
};

BookModal.propTypes = {
    book: PropTypes.array.isRequired,
    onClose: PropTypes.array,
};

export default BookModal;
