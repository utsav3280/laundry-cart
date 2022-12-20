const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

mongoose.connect(process.env.Mongo_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
    console.log('connected to Database');
});

mongoose.set('strictQuery', true);
const app = express();
app.use(express.json());

app.listen(5000, () => console.log("Server is up at 5000"))