import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route to save a new book
// Why do we use async?
router.post("/", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "All Fields must be completed!",
            });
        }
        if (req.body.publishYear > 2023 || req.body.publishYear < 1500) {
            return res.status(400).send({
                message: "Date must be between 1500 and 2023",
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(200).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Route to get all books from the DB
router.get("/", async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Route to get all books from the DB
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Update a book - we use put to update
router.put("/:id", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "All Fields must be completed!",
            });
        }

        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).send({ message: "Book not Found" });
        }

        return res.status(200).send({ message: "Book Updated!" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Route Delete a Book
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({ message: "Book not Found" });
        }

        return res
            .status(200)
            .send({ message: `The Book  ${result.title}  has been Deleted!` });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;
