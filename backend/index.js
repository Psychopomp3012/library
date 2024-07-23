const express = require("./node_modules/express");
const Book = require("./models/bookModel");
const app = express();
require('dotenv').config();
const booksRoute = require("./routes/booksRoute");

const mongoose = require("./node_modules/mongoose");
const cors = require("./node_modules/cors");

mongoose
.connect(process.env.MONGOOSE_URI)
.then(() => {
    console.log("database connected");
})
.catch((error) => {
    console.log(error);
});


const port = process.env.PORT;

app.use(express.json());

// app.use(cors());

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    })
);

app.use('/books', booksRoute);

app.get("/", (req, res) => {
    // console.log(req);
    return res.status(234).send("Start");
});

app.listen(port, () => {
    console.log(`running on ${port}`);
});