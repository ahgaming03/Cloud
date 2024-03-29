const mongoose = require("mongoose");

const dbName = "ToyShop";

const uri = "mongodb+srv://admin:Abcd1234@cloud.ls9nsmr.mongodb.net/" + dbName;

const connectDB = async () => {
    mongoose
        .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => console.log("Connected to MongoDB"))
        .catch((err) => console.error("Error connecting to MongoDB", err));
};

module.exports = connectDB;
