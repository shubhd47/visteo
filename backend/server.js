const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const books = require("./routes/books.js");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/books", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
    process.exit();
  });

app.use(bodyParser.json());
app.use(cors());
app.use('/api/books',books)
app.listen(4000, () => {
  console.log("Listening on 4000");
});
