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
        quantity: {
            type: Number,
            required: false,
            default: 1,
        },
        price: {
            type: Number,
            required: false,
            default: 5.0,
        },
        images: {
            type: [String],
            required: false,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

// export const Book = mongoose.model("Book", bookSchema);

module.exports = mongoose.model("Book", bookSchema);
