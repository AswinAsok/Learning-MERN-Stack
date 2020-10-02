var express = require('express')
var router = express.Router()
const { check } = require('express-validator');
const{signout, signup} = require("../controllers/auth")

router.post("/signup",[
    check("name", "Name should be at least 3 Characters").isLength({ min: 3 }),
    check("email", "Email is Required").isEmail(),
    check("password", "Password shoulf br atleast 3 characters").isLength({min: 3})
], signup)
router.get("/signout", signout);

module.exports = router;