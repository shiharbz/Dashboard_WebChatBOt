const {Questions,Intent} = require("../models/intentModel");

exports.questionsIntent = (req, res, next) => {
  let bulkOps = req.body.intent.questions.map((item) => {
      return {
          updateOne: {
              filter: { _id: item._id },
              update: { quest: item.quest },
          },
      }
  });
  Questions.bulkWrite(bulkOps, {}, (error, questions) => {
    if (error) {
      return res.status(400).json({
        error: "Could not update questions",
      });
    }
    next();
  });
};
