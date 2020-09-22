const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        time: true,

    },

    lastname:{
        type: String,
        maxlength: 32,
        time: true,
    },

    email:{
        type: String,
        tirm: true,
        required: true,
        unique: true,

    },
    userInfo:{
        type: String,
        trim: true,
    },
    //TODO come back here
    password:{
        type: String,
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
    
});

module.exports = mongoose.model("User",userSchema)