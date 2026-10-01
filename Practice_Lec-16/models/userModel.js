const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
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
    weight: {
        type: Number,
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
}, {"timestamps": true});

const UserModel = model("User", userSchema);

module.exports = UserModel;