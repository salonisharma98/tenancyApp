const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const url = "mongodb://localhost/UserData";
const NewUser = require("./modals/ImageModal");
const cors = require("cors");

const app = express();
mongoose.connect(url);
const con = mongoose.connection;
con.on("open", function () {
  console.log("connected...");
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/UserRoute");
app.use("/", userRouter);

app.listen(5000, () => {
  console.log("listening to port 5000");
});
