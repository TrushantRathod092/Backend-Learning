const express = require("express");
const router = express.Router();

const User = require("../models/userModel");

router.get('/users', async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

router.post('/users', async(req, res) => {
    try {
        const {name, age, weight} = req.body;
        const newUser = new User({name, age, weight});
        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

module.exports = router;