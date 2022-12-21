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

router.post("/id", authentication, async (req, res) => {
    try {
        console.log(req.body);
        const orders = await Orders.find({ _id: req.body._id });
        res.json({
            orders
        })
        // return orders.OrderDetails
    } catch (error) {
        res.json({
            message: error.message
        })
    }
});


router.post("/create", authentication, async (req, res) => {
    try {
        const order = await Orders.create({
            userID: req.userID, //
            _id: req.body._id,
            items: req.body.items,
            price: req.body.price,
            OrderDetails: req.body.OrderDetails
        });
        res.json({
            order: order
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

module.exports = router;