const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const QuestionSchema = new mongoose.Schema({
  id: { type: ObjectId, ref: "Intent" },

  quest: String,
});

const Questions = mongoose.model("Questions", QuestionSchema);

const ResponseSchema = new mongoose.Schema({
  id: { type: ObjectId, ref: "Intent" },
  responses: String,
});

const Responses = mongoose.model("Responses", ResponseSchema);

const IntentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    questions: [QuestionSchema],
    responses: [ResponseSchema],
    user: { type: ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Intent = mongoose.model("Intent", IntentSchema);

const storiesSchema = new mongoose.Schema({
  id: { type: ObjectId, ref: "Intent" },
  Intent: [IntentSchema],
});

const Stories = mongoose.model("Stories", storiesSchema);

module.exports = { Intent, Questions, Responses, Stories };
