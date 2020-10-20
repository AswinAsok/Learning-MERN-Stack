const express = require("express");
const router = express.Router();

const {getProductById, createProduct, getProduct,photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories} = require("../controllers/product")
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//All of Params
router.param("userId", getUserById);
router.param("productId", getProductById)

//All of the actual Routes
//Create Route
router.post("/product/create/:userId", isSignedIn,isAuthenticated,isAdmin, createProduct)

//Read Routes
router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", photo)

//Delele Route
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct)
//Update Route
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct)

//Listing Route
router.get("/products", getAllProducts)

router.get("/products/categories", getAllUniqueCategories)

module.exports = router;