import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
//https://medium.com/google-cloud/migrating-collections-from-mongodb-to-cloud-firestore-dfeff15f1c8
//migrate from MongoDB to Firebase??
import cors from "cors";

//Import Models
import { Book } from "./models/bookModel.js";

//Routes Import
import booksRoute from "./routes/booksRoute.js";

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

const PORT = process.env.PORT;
const mongoDBURL = process.env.mongoDBURL;

app.get("/", (req, res) => {
    console.log("Root...");
    return res.status(254).send("Welcome to Book Store Project");
});

//Routes
app.use("/books", booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Database Connected...");
        app.listen(PORT, () => {
            console.log(`App Started at port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });