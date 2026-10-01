const {Schema, model} = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxLength: 50,
        immutable: true,
    },
    age: {
        type: Number,
        required: true,
        min: 12,
    },
    gender: {
        type: String,
        // enum: ["male", "female", "others"],
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Invalid Gender");
            }
        }
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // it will not show by get request i.e. it will stay hidden
    },
    weight: {
        type: Number,
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
}, {"timestamps": true});

userSchema.methods.getJWT = function(){
    const ans = jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.JWT_SECRET
        // {expiresIn: 10}
    )

    return ans;
}

userSchema.methods.verifyPassword = async function(userPassword){
    const ans = await bcrypt.compare(userPassword, this.password);

    return ans;
}


const UserModel = model("User", userSchema);

module.exports = UserModel;