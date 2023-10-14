const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

// connect to MongoDB
const username = "root";
const password = "Abcd1234";
const dbName = "ToyShop";

const uri =
    "mongodb+srv://" +
    username +
    ":" +
    password +
    "@mvc-example.elbom2r.mongodb.net/" +
    dbName;

mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        (result) => console.log("Connected to MongoDB"),
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    )
    .catch((err) => console.error("Error connecting to MongoDB", err));

// set view engine
app.set("view engine", "ejs");

// set middleware & static file
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


// import routes
app.use("/products", require("./routes/productRoutes"));


// main route
app.use("/", require("./routes/routes")); // this should be the last route



module.exports = app;
