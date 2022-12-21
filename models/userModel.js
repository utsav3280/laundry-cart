const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, unique: true, required: true },
    phone: { type: Number, unique: true, required: true },
    password: { type: String, required: true },
    address: {
        street: { type: String },
        district: { type: String },
        state: { type: String },
        pincode: { type: String }
    }
}); 

const Users = mongoose.model("UserDetails", UserSchema);
module.exports = Users;



