const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());


const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
// mongoose.set('strictQuery', true);


app.use(cookieParser());

dotenv.config();


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use("/authUser", require("./routers/userRouter"));
app.use("/intent", require("./routers/intentRouter"));


app.get("/", function (req, res) {
  res.send("ChatBot backend");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
mongoose.connect(
  process.env.MDB_CONNECT_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.error(err);
    console.log("connected to MongoDB");
  }
);