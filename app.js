const express = require("express");
const connectDB = require("./database/db");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");



const app = express();
const PORT = process.env.PORT || 3000;

// connect to MongoDB
connectDB();

// set view engine
app.set("view engine", "ejs");

// set middleware & static file
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(expressLayouts);


// import routes
app.use("/products", require("./routes/productRoutes"));

// main route
app.use("/", require("./routes/routes")); // this should be the last route

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
module.exports = app;
