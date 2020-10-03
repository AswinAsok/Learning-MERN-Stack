var express = require("express");
var router = express.Router();

const { check, validationResult } = require("express-validator");
const { signout, signup, signin } = require("../controllers/auth");

router.post(
  "/signin",
  [
    check("email", "Email is Required").isEmail(),
    check("password", "Password Field is Required").isLength({
      min: 1,
    }),
  ],
  signin
);

router.post(
  "/signup",
  [
    check("name", "Name should be at least 3 Characters long").isLength({
      min: 3,
    }),
    check("email", "Email is Required").isEmail(),
    check("password", "Password should be atleast 3 characters long").isLength({
      min: 3,
    }),
  ],
  signup
);

router.get("/signout", signout);

module.exports = router;
