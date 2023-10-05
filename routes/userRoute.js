const express = require('express')
const router = express.Router();
const User = require('../models/userModel')
const Profile = require('../models/profileModel')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewars/authMiddelware');
const { set } = require('mongoose');

let email_user;

router.post('/register', async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(200).send({ message: 'User already exists', success: false })
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword
        const newUser = new User(req.body)
        await newUser.save();
        res.status(200).send({ message: "user Created successfully", success: true });
    } catch (error) {
        res.status(500).send({ message: "Error Creating user", success: false, error })
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {

            return res.status(200).send({ message: "User does not exist", success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            email_user = user.email
            return res.status(200).send({ message: "Password is incorrect", success: false })
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT, {
                expiresIn: '1d'
            })
            res.status(200).send({ message: "Login successfull", success: true, data: token })
        }
    } catch (error) {
        res.status(500).send({ message: "Login faild", success: false, error })
    }
})


router.post('/get-user-info-by-id', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        if (!user) {
            return res
                .status(200).send({ message: "User does not exist", success: false });
        } else {
            res.status(200).send({
                success: true, data: {
                    name: user.name,
                    email: user.email,
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error getting info', success: false, error })
    }
})

router.post('/profile', async (req, res) => {

})


module.exports = router
