const Cateogry = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Cateogry.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = cate;
  });

  next();
};

exports.createCategory = (req, res) => {
  const category = new Cateogry(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save category in DB",
      });
    }

    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
    return res.json(req.category)
}

exports.getAllCategories = (req, res) => {
    Cateogry.find().exec((err, categories)=>{
        if(err){
            return res.status(400).json({
                error: "No Categories found"
            })
        }
        res.json(categories)
    })
}