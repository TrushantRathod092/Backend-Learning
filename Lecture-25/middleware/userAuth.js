const { model } = require("mongoose");
const User = require("../models/userModel")
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");

// require("dotenv").config();

const userAuth = async(req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token doesn't exist");
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(payload);
        
        const {_id} = payload;
        if(!_id){
            throw new Error("Id is Missing");
        }
        
        // const users = await User.find();
        const result = await User.findById(_id);
        if(!result){
            throw new Error("User doesn't exist");
        }

        const isBlocked = await redisClient.exists(`token:${token}`)
        if(isBlocked){
            throw new Error("Invalid Token");
        }

        req.result = result;
        // console.log("User Authentication");

        next();
    } catch (error) {
        res.status(401).send({
            success: false,
            message: error.message,
        })
    }
}

module.exports = userAuth;