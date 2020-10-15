const Cateogry = require("../models/category")

exports.getCategoryById = (req, res, next, id)=> {

    Cateogry.findById(id).exec((err, cate)=>{
        if(err){
            return res.status(400).json({
                error:"Category not found in DB"
            })
        }
        req.category = cate
    })






    next();
}