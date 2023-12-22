import express from "express";

require("dotenv").config;

const app = express();

PORT = process.env.PORT;

app.listen(PORT, () => {});
