const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

// view all products
router.get("/", productController.product_index);

// add product
router.post("/", productController.product_create_post);

// delete product
router.delete("/:id", productController.product_delete);

// update product
router.post("/update/:id", productController.product_update_post);

module.exports = router;
