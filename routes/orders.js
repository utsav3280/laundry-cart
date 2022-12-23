const Orders = require("../models/orderModels");
const router = require("express").Router();
const moment = require("moment");
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
          message: "Please Sign-In again to continue",
        });
      }
      req.userID = decoded.data;
      next();
    });
  } else {
    res.json({
      status: "Failed",
      message: "Sign-in to go to orders",
    });
  }
};

router.get("/", authentication, async (req, res) => {
  try {
    const orders = await Orders.find({ userID: req.userID });
    res.json({
      orders,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

router.post("/id", authentication, async (req, res) => {
  try {
    console.log(req.body);
    const orders = await Orders.find({ _id: req.body.id });
    res.json({
      orders,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

router.put("/id", authentication, async (req, res) => {
  try {
    console.log(req.body);
    const orders = await Orders.updateOne(
      { _id: req.body.id },
      { $set: { status: "cancelled" } }
    );
    res.json({
      orders,
    });
    // return orders.OrderDetails
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

router.post("/create", authentication, async (req, res) => {
  try {
    console.log(req.body.reqData);
    var items = 0;
    var total = 0;
    for (let i = 0; i < req.body.reqData.length; i++) {
      items += parseInt(req.body.reqData[i].quantity);
      total += parseInt(req.body.reqData[i].totalPrice);
    }

    const lastOrder = await Orders.findOne().sort({ $natural: -1 });
    const currentOrderId =
      "ODR" + (parseInt(lastOrder._id.split("ODR")[1]) + 1);
    const currDate = moment().format("lll");
    console.log(currDate);
    const order = await Orders.create({
      userID: req.userID, //
      _id: currentOrderId,
      items: items,
      dateTime: currDate,
      price: total,
      OrderDetails: req.body,
    });
    console.log("inside create");
    res.json({
      order: order,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
});

module.exports = router;
