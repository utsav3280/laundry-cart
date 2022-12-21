const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
    userID: { type: ObjectId, ref: "Users" },
    _id: { type: String, unique: true },
    dateTime: { type: String, default: moment().format('lll') },
    items: { type: Number },
    price: { type: Number },
    status: { type: String, default: "order placed" },
    OrderDetails: { type: Array }
});

const Orders = mongoose.model("Orders", OrderSchema);
module.exports = Orders;