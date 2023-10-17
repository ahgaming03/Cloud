const mongoose = require("mongoose");

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

const connectDB = async () => {
    mongoose
        .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => console.log("Connected to MongoDB"))
        .catch((err) => console.error("Error connecting to MongoDB", err));
};

module.exports = connectDB;
