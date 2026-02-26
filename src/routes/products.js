const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/auth");

// CRUD de productos con roles
router.post("/", authMiddleware(["admin"]), productController.createProduct);
router.get("/", authMiddleware(["admin","user"]), productController.getProducts);
router.put("/:id", authMiddleware(["admin"]), productController.updateProduct);
router.delete("/:id", authMiddleware(["admin"]), productController.deleteProduct);

module.exports = router;