const Users = require('../models/userModel');
const Orders = require("../models/orderModels")
const router = require('express').Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "passback"

router.get("/orders", async (req, res) => {
    try {
        const orders = await Users.find({ _id: req.body.userId });
        res.json({
            orders
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
});

router.get("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({ $or: [{ email: username }, { phone: username }] });
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    return res.status(500).json({
                        status: "Failed",
                        message: err.message
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: user._id
                    }, secret);

                    return res.json({
                        status: "success",
                        message: "Login successfull",
                        token
                    })
                }

                res.json({
                    status: "Failed",
                    message: "Invalid Password"
                })
            });
        }
    } catch (error) {

    }
})

router.post("/register", async (req, res) => {
    try {
        const password = req.body.password
        bcrypt.hash(password, 10, async function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                return res.status(500).json({
                    status: "Failed",
                    message: err.message
                })
            }
            await Users.create({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: hash,
                address: {
                    street: req.body.street,
                    district: req.body.district,
                    state: req.body.state,
                    pincode: req.body.pincode
                }
            });
            res.json({
                message: "success"
            })
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

router.post("/orders/create", async (req, res) => {
    try {
        await Orders.create(req.body);
        res.send("success")
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

module.exports = router;