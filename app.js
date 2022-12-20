const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("../laundry-cart/routes/routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/', router); 
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.Mongo_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB')
});

// mongoose.connect("mongodb://localhost:27017/laundryCart");


mongoose.set('strictQuery', true);


app.listen(5000, () => console.log("Server is up at 5000"))