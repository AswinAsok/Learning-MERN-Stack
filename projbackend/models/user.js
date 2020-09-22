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


userSchema.method = {
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