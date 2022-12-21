const Users = require("../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
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
      res.json({
        message: "success",
        // redirecting
      });
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

module.exports = router;
