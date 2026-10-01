const express = require("express");
const router = express.Router();

const User = require("../models/userModel")
const validateUser = require("../utils/validateUser");
const bcrypt = require("bcrypt");
const validator = require("validator")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("../middleware/userAuth");

router.use(cookieParser())

// CRUD Operations

// Read / View
router.get('/users', userAuth, async(req, res) => {
    try{
        // console.log(req.cookies);
        // res.status(200).send(users); // it is also correct along with below
        // res.status(200).json(users);
        res.send(req.result);
    }catch(error){
        res.status(500).send({
            success: false,
            message: error.message,
        })
    }
})

// create
router.post('/users', async(req, res) => {
    try{
        // const {name, age, gender, weight} = req.body;
        // const newUser = new User({name, age, gender, weight});
        // await newUser.save();

        // API level validation
        validateUser(req.body);

        // converting dthe password in hash value
        req.body.password = await bcrypt.hash(req.body.password, 10);

        const newUser = await User.create(req.body);

        res.status(201).send({
            success: true,
            user: newUser,
            message: "User Registered successfully",
        })
    }catch(error){
        res.status(400).send({
            success: false,
            message: error.message,
        })
    }
})

// update
router.patch('/users/:id', userAuth, async(req, res) => {
    const {id} = req.params;
    try{
        // Check if at least one field is provided
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                success: false,
                message: "No fields provided for update",
            })
        }

        // Validate fields only if they are provided
        if(req.body.email && !validator.isEmail(req.body.email)){
            return res.status(400).send({
                success: false,
                message: "Invalid Email",
            })
        }

        // for password hashing
        if(req.body.password){
            if(!validator.isStrongPassword(req.body.password)){
                return res.status(400).send({
                    success: false,
                    message: "Weak Password",
                })
            }
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }

        // Find the user and update it
        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            {
                "runValidators": true,
                // new: true, //older version, use the below syntax
                returnDocument: "after",
                strict: "throw",  // throws error if unknown key used to update
            }
        );

        // User not found
        if(!updatedUser){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // if user is updated successfully
        // res.status(200).send(users); // it is also correct along with below
        res.status(200).json({
            success: true,
            user: updatedUser
        });
    }catch(error){
        res.status(400).send({
            success: false,
            message: error.message,
        })
    }
})

// delete
router.delete('/users/:id', userAuth, async(req, res) => {
    const {id} = req.params;
    try{
        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // if user is updated successfully
        // res.status(200).send(users); // it is also correct along with below
        res.status(200).json({
            success: true,
            user: deletedUser
        });
    }catch(error){
        res.status(500).send({
            success: false,
            message: error.message,
        })
    }
})


// login
router.post('/users/login',async(req, res) => {
    try {
        const people = await User.findOne({
            email: req.body.email
        }).select("+password");

        // user not found
        if(!people){
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            })
        }
    
        // check password
        const isAllowed = people.verifyPassword(req.body.password);

        if(!isAllowed){
            return res.status(401).send({
                success: false,
                message: "Invalid Credentials",
            })
        }
    
        // jwt token
        // token = jwt.sign(payload, secret_key)
        const token = people.getJWT();
        res.cookie("token", token);

        res.status(200).json({
            success: true,
            message: "Login Successfull",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        })
    }
})

module.exports = router;