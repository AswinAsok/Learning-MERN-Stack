const mongoose = require("mongoose")
const crypto = require('crypto')
import { v1 as uuidv1 } from 'uuid';

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

    encry_password:{
        type: String,
        required: true
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

userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1()
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password
    })



userSchema.method = {

    authenticate: function(plainpassord){
        return this.securePassword(password) === this.encry_password

    },

    securePassword: function(plainpassord){
        if(!plainpassord) return "";

        try {
            return crypto
            .createHmac('sha256',this.salt)
            .update(plainpassord)
            .digest('hex')

        } catch (err) {
            return "";
        }
    }
}

module.exports = mongoose.model("User",userSchema)