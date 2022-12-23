const Users = require("../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const dotenv = require("dotenv");
dotenv.config();

// router.get("/", async(req, res) => {
//   try{
//     //  const user = await Users.findOne()
//   }catch(){

//   }
// })

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const val = validator.isEmail(username);
    let user;
    if (val) user = await Users.findOne({ email: username });
    else user = await Users.findOne({ phone: username });

    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return res.status(500).json({
            status: "Failed",
            message: err.message,
          });
        }
        if (result) {
          // true
          const token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
              data: user._id,
            },
            process.env.secret
          );

          return res.json({
            status: "success",
            message: "Login successfull",
            token: token,
            name: user.name,
          });
        }

        res.json({
          status: "Failed",
          message: "Invalid Password",
        });
      });
    } else {
      res.json({
        status: "Failed",
        message: "User does not exists",
      });
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: error.message,
    });
  }
});

module.exports = router;
