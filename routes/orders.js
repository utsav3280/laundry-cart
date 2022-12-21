const Orders = require("../models/orderModels")
const router = require('express').Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authentication = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.secret, function (err, decoded) {
            if (err) {
                return res.json({
                    status: "Failed",
                    message: "Please Sign-In again to continue"
                })
            }
            req.userID = decoded.data;
            next();
        });
    }
    else {
        res.json({
            status: "Failed",
            message: "Sign-in to go to orders"
        })
    }
}

router.get("/", authentication, async (req, res) => {
    try {
        const orders = await Orders.find({ userID: req.userID });
        res.json({
            orders
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}); 

module.exports = router;