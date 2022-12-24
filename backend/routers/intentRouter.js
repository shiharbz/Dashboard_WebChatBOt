const router = require("express").Router();
require("dotenv").config();

require("dotenv").config();

const authUser = require("../middleware/authUser");
const User = require("../models/userModel");
const { Intent, Questions, Responses } = require("../models/IntentModel");

router.post("/addTitle/:id", async (req, res, next) => {
  const { title } = req.body;

  const user = req.params.id;

  // console.log(id);


  const originaltitle = await Intent.findOne({ title });

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

router.post("/addQuestions/:id", authUser,async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const user = req.user;

    const { quest } = req.body;
    const id = req.params.id;

    console.log("quest........" + quest);

    if (!quest) {
      return res.status(400).json({
        errorMessage: "Please add question",
      });
    }
    const Intentque = await Intent.findById(id);
    console.log(Intentque);

    const questions = Intentque.questions;
    console.log(questions);
    questions.quest = quest;

    console.log(quest);
    console.log(questions);

    const newQuestion = new Questions({ quest, id });
    console.log("new....." + newQuestion);

    const title = Intentque.title;
    const newIntent = new Intent({ Questions, id });

    await newQuestion.save((error, values) => {
      if (error) {
        console.log(error);

        return res.status(400).json({
          error: errorHandler(error),
        });
      }
    });

    return res.json(true);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});


router.get("/allQue/:id", authUser, async (req, res) => {
  const intentid = req.params.id;

  const questions = await Questions.find({ id:intentid });

  res.json(questions);

  console.log( questions);
});

router.get("/all", authUser, async (req, res) => {
  const intents = await Intent.find({ user: req.user });

  res.json(intents);

  // console.log(intents);
});

router.post("/addresponse/:id", async (req, res, next) => {});

module.exports = router;
