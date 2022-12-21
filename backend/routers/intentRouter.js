const router = require("express").Router();
require("dotenv").config();

require("dotenv").config();

const authUser = require("../middleware/authUser");
const User = require("../models/userModel");
const Intent =require("../models/intentModel")


router.post("/data", async (req, res, next) => {
  console.log(req.body);

  
});














module.exports = router;