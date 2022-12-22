const router = require("express").Router();
require("dotenv").config();

require("dotenv").config();

const authUser = require("../middleware/authUser");
const User = require("../models/userModel");
const Intent = require("../models/intentModel");

router.post("/addTitle/:id", async (req, res, next) => {
  const { title } = req.body;
  const user = req.params.id;
  const originaltitle = await Intent.findOne({title});
  if (originaltitle) {
    return res.status(400).json({
      errorMessage: "Already title exists",
    });
  }
  if (!title) {
    return res.status(400).json({
      errorMessage: "Please specify title",
    });
  }

  const newIntent = new Intent({
    title,
    user,
  });

  const savedIntent = await newIntent.save();
  res.json(savedIntent);
});

router.get("/all", authUser ,async (req, res) => {
  const intents = await Intent.find({ user: req.user });
  res.json(intents);
  console.log(intents)
});


router.post("/addquestion/:id", async (req, res, next) => {});

router.post("/addresponse/:id", async (req, res, next) => {});

module.exports = router;
