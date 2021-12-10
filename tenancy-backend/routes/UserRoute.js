const express = require("express");
const router = express.Router();
const User = require("../modals/UserModal");
const NewUser = require("../modals/ImageModal");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../jwt/keys");
const authenticate = require("../jwt/authetication");
const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|gif|pdf|doc)$/)) {
      cb(new Error("only upload files with jpg or jpeg format."));
    }
    cb(undefined, true);
  }
});

//post file
router.post(
  "/uploadImage",
  upload.single("photo"),
  async (req, res) => {
    const photo = new NewUser(req.body);
    const file = req.file.buffer;
    photo.photo = file;
    await photo.save();
    res.set("Content-Type", "image/jpeg");
    res.send(photo.photo);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//get all file
router.get("/getFile", async (req, res) => {
  try {
    const getphoto = await NewUser.find();
    res.send(getphoto);
  } catch (err) {
    res.send("Error occured" + err);
  }
});

//get file by id
router.get("/getFile/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getFile = await NewUser.findById(id);
    res.set("Content-Type", "image/jpeg");
    res.send(getFile.photo);
  } catch (err) {
    res.send("Error occured" + err);
  }
});

//get all user
router.get("/allUser", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.send("Error occured" + err);
  }
});

//create user
router.post("/signup", async (req, res) => {
  const { fullName, email, password, mobile } = req.body;
  const user = new User({
    FullName: fullName,
    UserId: email,
    Password: password,
    Contact: mobile
  });
  try {
    if (!fullName || !email || !password || !mobile) {
      return res.json({ error: "fill the fields properly" });
    }
    const oldUSer = await User.findOne({ UserId: email });
    if (!oldUSer) {
      const data = await user.save();
      res.json(data);
    } else {
      return res.json("user already exist");
    }
  } catch (err) {
    res.send("error" + err);
  }
});

//login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const userLoggingIn = await User.findOne({
      UserId: email,
      Password: password
    });
    if (!userLoggingIn) {
      return res.json({ error: "invalid user" });
    } else {
      const token = jwt.sign({ _id: userLoggingIn._id }, JWT_SECRET);
      res.json({ token, userLoggingIn });
    }
  }
  if (!email || !password) {
    return res.status(400).json({ error: "fill the data properly" });
  }
});

//Home
router.get("/home", authenticate, async (req, res) => {
  res.json("home route");
});

module.exports = router;
