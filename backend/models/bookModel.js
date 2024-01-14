// import mongoose from "mongoose";
const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
    {
        //Object that contains all the Features for our schema
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// export const Book = mongoose.model("Book", bookSchema);

module.exports = mongoose.model("Book", bookSchema);
