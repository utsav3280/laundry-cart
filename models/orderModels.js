const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
  userID: { type: ObjectId, ref: "Users" },
  _id: { type: String },
  dateTime: { type: String },
  items: { type: Number },
  price: { type: Number },
  status: { type: String, default: "order placed" },
  OrderDetails: { type: Array },
});

const Orders = mongoose.model("Orders", OrderSchema);
module.exports = Orders;
