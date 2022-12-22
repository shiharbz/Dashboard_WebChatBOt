const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const intentSchema = new mongoose.Schema(
  {
    
    title: { type: String, required: true },
    questions: { type: Array, "default": []},
    responses: { type: Array, "default": []},
    user: { type: ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

const Intent = mongoose.model("intent", intentSchema);

module.exports = Intent;
