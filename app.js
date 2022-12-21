const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dotenv = require("dotenv");
dotenv.config();
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const orderRoute = require("./routes/orders");
const cors = require("cors");

mongoose.set('strictQuery', true);
mongoose.connect(process.env.Mongo_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB')
});

app.use(cors("*"));
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/orders', orderRoute);

app.listen(5000, () => console.log("Server is up at 5000"))