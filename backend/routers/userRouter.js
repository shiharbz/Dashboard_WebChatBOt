const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authUser = require("../middleware/authUser");
const User = require("../models/userModel");

router.post("/sign-up", async (req, res, next) => {
  console.log(req.body);
  
 try {
   const { firstname, lastname, email, password } = req.body;

   if (!firstname || !lastname  || !email || !password) {
     return res.status(400).json({
       errorMessage: "please enter all required field",
     });
   }



   var emailRegex =
     /^(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9])*([\._-])?([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/i;
   var valid = emailRegex.test(email);
   if (!valid)
     return res.status(400).json({
       errorMessage: "please enter valid email",
     });

   var nameExp = /^[A-Za-z]*$/;
   if (!nameExp.test(firstname))
     return res.status(400).json({
       errorMessage: "please enter text only",
     });

   var lnameExp = /^[A-Za-z]*$/;
   if (!lnameExp.test(lastname))
     return res.status(400).json({
       errorMessage: "please enter correct last name",
     });

  

   var pwdExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
   if (!pwdExp.test(password))
     return res.status(400).json({
       errorMessage:
         "enter a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
     });

   if (firstname.length < 3)
     return res.status(400).json({
       errorMessage: "please enter min 3 characters long name",
     });

  

   if (password.length < 6)
     return res.status(400).json({
       errorMessage: " Atleast 6 characters needed",
     });



   const existingUser = await User.findOne({ email });
   console.log(existingUser);
   if (existingUser)
     return res.status(400).json({
       errorMessage: "Already exists",
     });
   
  

   const salt = await bcrypt.genSalt();
   const passwordHash = await bcrypt.hash(password, salt);

  

   const newUser = new User({
     firstname,
     lastname,
     email,
     passwordHash,
     user: req.token,
   });


   const savedUser = await newUser.save();

   //create a JWT token

   const token = jwt.sign(
     {
       id: savedUser._id,
     },
     process.env.JWT_SECRET
   );

   res.cookie("token", token, { httpOnly: true }).send();
 } catch (err) {
   console.log(err);

   res.status(500).send();
 }
});


router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    console.log("token..................." + token);

    if (!token) return res.json(null);

    const validatedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = validatedUser.id;

    res.json(validatedUser.id);
    console.log(validatedUser);
  } catch (err) {
    return res.json(null);
  }
});
module.exports = router;
