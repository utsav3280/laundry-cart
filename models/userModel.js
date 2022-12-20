const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    phone: { type: Number, unique: true },
    password: { type: String },
    address: {
        street: { type: String },
        district: { type: String },
        state: { type: String },
        pincode: { type: String }
    }
});

const Users = mongoose.model("UserDetails", UserSchema);
module.exports = Users;



