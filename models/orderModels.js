const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Users = require("./userModel");

const OrderSchema = new Schema({
    userId: { type: ObjectId, ref: "Users" },
    _id: { type: String, unique: true },
    dateTime: { type: String, default: moment().format('lll') },
    items: { type: Number },
    price: { type: Number },
    status: { type: String, default: "order placed" },
    OrderDetails: { type: Array }
});

const Orders = mongoose.model("Orders", OrderSchema);
module.exports = Orders;



