const mongoose = require("mongoose");
  const ObjectId = mongoose.Schema.Types.ObjectId;
// const Schema = mongoose.Schema;
// const { ObjectId } = mongoose.Schema;



const QuestionSchema = new mongoose.Schema({
  
id: { type: ObjectId,  ref: "Intent" },

 
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

module.exports = { Intent, Questions, Responses };
