const express = require("express");
const productController = require("../controllers/productController");
const multer = require("multer");
const router = express.Router();

const storage = multer();

// view all products
router.get("/", productController.product_index);

// add product
router.post("/create",storage.any(), productController.product_create_post);

// delete product
router.delete("/:id", productController.product_delete);

// update product
router.post("/update/:id",storage.any(), productController.product_update_post);

module.exports = router;
