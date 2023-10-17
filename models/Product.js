const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        image: {
            id: String,
            name: String,
            mimeType: String,
            webViewLink: String,

        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Products", ProductSchema);

module.exports = Product;
