// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// //https://medium.com/google-cloud/migrating-collections-from-mongodb-to-cloud-firestore-dfeff15f1c8
// //migrate from MongoDB to Firebase??
// import cors from "cors";

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// //Import Models
// import { Book } from "./models/bookModel.js";

// //Routes Import
// import booksRoute from "./routes/booksRoute.js";
// import paymentsRoute from "./routes/paymentsRoute.js";

const Book = require("./models/bookModel");
const booksRoute = require("./routes/booksRoute.js");
const paymentsRoute = require("./routes/paymentsRoute.js");

dotenv.config();

const app = express();

//Middleware for parsing request body
app.use(express.json());

//CORS POLICY MiddleWare
//Option 1: Allow all origins with default of Cors(*)
app.use(cors());
//Option 2: Allow Custom Origins ---- This method is preffered as you have more control...
// app.use(
//     cors({
//         origin: "http://localhost:5000",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"],
//     })
// );

const LOCALPORT = process.env.LOCALPORT;
const MONGODBURL = process.env.MONGODBURL;

app.get("/", (req, res) => {
    console.log("Root...");
    return res.status(200).json({ message: "Welcome to Book Store Project" });
});

//Routes
app.use("/books", booksRoute);

app.use("/payments", paymentsRoute);

mongoose
    .connect(MONGODBURL)
    .then(() => {
        console.log("Database Connected...");
        app.listen(LOCALPORT, () => {
            console.log(`App Started at port: ${LOCALPORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

export default app;
