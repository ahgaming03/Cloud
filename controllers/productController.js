const stream = require("stream");
const drive = require("../middleware/auth");
const Product = require("../models/Product");
const moment = require("moment");
const path = require("path");
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
const product_create_post = async (req, res) => {
    const { body, files } = req;
    try {
        let image = "";
        if (files.length > 0) {
            image = await uploadFile(files[0]);
        }
        const product = new Product({
            name: body.name,
            price: body.price,
            description: body.description,
            image: {
                id: image.id,
                name: image.name,
                mimeType: image.mimeType,
                url: "https://drive.google.com/uc?export=view&id=" + image.id,
            },
        });
        product
            .save()
            .then((result) => {
                console.log("Add a product successfully");
                res.json({ redirect: "/products" });
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};

// delete product
const product_delete = (req, res) => {
    const id = req.params.id;

    deleteImage(id);
    Product.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: "/products" });
        })
        .catch((err) => {
            console.log(err);
        });
};

// update product
const product_update_post = async (req, res) => {
    const { body, files } = req;
    const id = req.params.id;
    try {
        let image = "";
        if (files.length > 0) {
            deleteImage(id);
            image = await uploadFile(files[0]);
            Product.findByIdAndUpdate(id, {
                name: body.name,
                price: body.price,
                description: body.description,
                image: {
                    id: image.id,
                    name: image.name,
                    mimeType: image.mimeType,
                    url:
                        "https://drive.google.com/uc?export=view&id=" +
                        image.id,
                },
            })
                .then((result) => {
                    console.log("Add a product successfully");
                    res.json({ redirect: "/products" });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            Product.findByIdAndUpdate(id, {
                name: body.name,
                price: body.price,
                description: body.description,
            })
                .then((result) => {
                    console.log("Add a product successfully");
                    res.json({ redirect: "/products" });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    } catch (err) {
        console.error(err);
    }
};

const uploadFile = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    try {
        bufferStream.end(fileObject.buffer);
        const { data } = await drive.files.create({
            media: {
                mimeType: fileObject.mimeType,
                body: bufferStream,
            },
            requestBody: {
                name: Date.now() + path.extname(fileObject.originalname),
                parents: ["1kxgAI-Z60m9LwsGMZP4KzKudidj0PapU"],
            },
            fields: "id,name, mimeType, webViewLink",
        });
        await setFilePublic(data.id);

        console.log(`Uploaded file:`, data);
        return data;
    } catch (err) {
        console.error(err);
    }
};

const setFilePublic = async (fileId) => {
    try {
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: "reader",
                type: "anyone",
            },
        });
    } catch (err) {
        console.log(err);
    }
};
const deleteImage = async (id) => {
    await Product.findById(id)
        .then((result) => {
            if (result.image) {
                drive.files.delete({
                    fileId: result.image.id,
                });
                console.log("Image on cloud was deleted");
            }
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
