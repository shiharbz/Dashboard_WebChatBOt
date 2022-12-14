const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());


const cookieParser = require("cookie-parser");

app.use(cookieParser());
dotenv.config();


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use("/authUser", require("./routers/userRouter"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
