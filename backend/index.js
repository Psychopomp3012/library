const express = require("./node_modules/express");
const Book = require("./models/bookModel");
const app = express();
require('dotenv').config();
const booksRoute = require("./routes/booksRoute");
const path = require('path'); // Add this to serve static files

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
        origin: 'https://library-production-8c6a.up.railway.app',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    })
);

app.use('/books', booksRoute);

// app.get("/", (req, res) => {
//     // console.log(req);
//     return res.status(234).send("Start");
// });

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// The "catchall" handler: for any request that doesn't match one above,
// send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});


app.listen(port, () => {
    console.log(`running on ${port}`);
});
