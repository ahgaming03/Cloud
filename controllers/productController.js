const Product = require("../models/Product");
const moment = require("moment");
// product_index, product_create_post, product_create_get, product_details, product_delete

// view all products
const product_index = (req, res) => {
    Product.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render("products/index", {
                title: "Products",
                products: result,
                moment: moment,
            });
        })
        .catch((err) => {
            console.error(err);
        });
};

// add product
const product_create_post = (req, res) => {
    const product = new Product(req.body);

    product
        .save()
        .then((result) => {
            res.redirect("/products");
        })
        .catch((err) => {
            console.error(err);
        });
};

// delete product
const product_delete = (req, res) => {
    const id = req.params.id;

    Product.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: "/products" });
        })
        .catch((err) => {
            console.log(err);
        });
};

// update product
const product_update_post = (req, res) => {
    const id = req.params.id;

    Product.findByIdAndUpdate(
        id,
        {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
        },
        { new: true }
    )
        .then((result) => {
            res.redirect("/products");
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = {
    product_index,
    product_create_post,
    product_delete,
    product_update_post,
};
