const express = require("express");
const router = express.Router();

const User = require("../models/userModel")

// CRUD Operations

// Read / View
router.get('/users', async(req, res) => {
    try{
        const users = await User.find();
        // res.status(200).send(users); // it is also correct along with below
        res.status(200).json(users);
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
        const {name, age, gender, weight} = req.body;
        const newUser = new User({name, age, gender, weight});
        await newUser.save();
        res.status(200).send({
            success: true,
            user: newUser,
        })
    }catch(error){
        res.status(500).send({
            success: false,
            message: error.message,
        })
    }
})

// update
router.put('/users/:id', async(req, res) => {
    const {id} = req.params;
    const {name, age, gender, weight} = req.body;
    try{
        const updatedUser = await User.findByIdAndUpdate(id, {name, age, gender, weight}, {"runValidators": true});

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
        res.status(500).send({
            success: false,
            message: error.message,
        })
    }
})

// delete
router.delete('/users/:id', async(req, res) => {
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

module.exports = router;