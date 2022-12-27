const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { Intent, Questions, Responses } = require("../models/IntentModel");

const authUser = require("../middleware/authUser");
const User = require("../models/userModel");


router.get("/getIntentCount",authUser, async (req, res) => {
  try {
    // const intents = await Intent.find({ user: req.user });

          const total = await Intent.countDocuments({ user: req.user });

    console.log(total);
    res.json(total);

  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});


router.post("/createStories/:id", authUser, async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const user = req.user;
    console.log(token);
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

module.exports = router;
