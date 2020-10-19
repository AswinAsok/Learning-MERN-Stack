const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product Not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with the Image",
      });
    }
    //Destructure the fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Include all the fields",
      });
    }

    let product = new Product(fields);

    //Handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(404).json({
          error: "File Size to too big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //Save to the DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Saving tshirt in DB Failed",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined
  return res.json(req.product)
}

exports.photo = (req, res, next) => {
  if(req.product.photo.data){
    res.set("Content-Type", req.product.photo.contentType)
    return res.send(req.product.photo.data)
  }
  next();
}

//Delete Controller
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct)=>{
    if(err){
      return res.status(400).json({
        error: "Failed to delete Product"
      })
    }
    res.json({
      message: "Deletion was success",
      deletedProduct
    })
  })
}

//Update Controller
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with the Image",
      });
    }

    //updation code
    let product = req.product;
    product = _.extend(product, fields)

    //Handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(404).json({
          error: "File Size to too big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //Save to the DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Updation of product failed",
        });
      }
      res.json(product);
    });
  });
}