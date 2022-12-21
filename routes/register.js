const Users = require("../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const userEmail = await Users.findOne({ email: req.body.email });
    const userPhone = await Users.findOne({ phone: req.body.phone });
    if (!userEmail && !userPhone) {
      const password = req.body.password;
      bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
          return res.status(500).json({
            status: "Failed",
            message: err.message,
          });
        }
        await Users.create({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: hash,
          address: {
            street: req.body.street,
            district: req.body.district,
            state: req.body.state,
            pincode: req.body.pincode,
          },
        });
        return res.json({
          message: "success",
          // redirecting
        });
      });
    } else {
      if (userEmail && userPhone) {
        return res.json({
          message: "email and phone already exists",
        });
      } else if (userEmail) {
        return res.json({
          message: "email already exists",
        });
      } else {
        return res.json({
          message: "number already exists",
        });
      }
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

module.exports = router;
