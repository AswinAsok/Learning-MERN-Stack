const express = require("express");
const router = express.Router();

const {getProductById, createProduct} = require("../controllers/product")
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//All of params
router.param("userId", getUserById);
router.param("productId", getProductById)

//all of actual routes
router.post("/product/create/:usedId", isSignedIn,isAuthenticated,isAdmin, createProduct)

module.exports = router;