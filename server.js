const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("node:path");
const dotenv = require("dotenv");
dotenv.config();

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/profilePics", express.static("profilePics"));
app.use(express.static(path.join(__dirname, "./client/build")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profilePics");
  },
  filename: (req, file, cb) => {
    console.log(file);

    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobileNo: String,
  profilePic: String,
});

let User = new mongoose.model("user", userSchema);

app.get("*", (req, res) => {
  res.sendFile("./client/build/index.html");
});

app.post("/login", upload.none(), async (req, res) => {
  console.log(req.body);

  let userDetails = await User.find().and({ email: req.body.email });
  console.log(userDetails);

  if (userDetails.length > 0) {
    let isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      userDetails[0].password
    );
    if (isPasswordCorrect == true) {
      let token = jwt.sign(
        {
          email: req.body.email,
          password: req.body.password,
        },
        "manav"
      );

      let details = {
        firstName: userDetails[0].firstName,
        lastName: userDetails[0].lastName,
        age: userDetails[0].age,
        email: userDetails[0].email,
        mobileNo: userDetails[0].mobileNo,
        profilePic: userDetails[0].profilePic,
        token: token,
      };

      res.json({ status: "success", data: details });
    } else {
      res.json({ status: "failure", msg: "Invalid Password." });
    }
  } else {
    res.json({ status: "failure", msg: "User doesnot exist." });
  }
});

app.post("/validateToken", upload.none(), async (req, res) => {
  console.log(req.body);

  try {
    let decryptedToken = jwt.verify(req.body.token, "manav");

    console.log(decryptedToken);

    let userDetails = await User.find().and({ email: decryptedToken.email });
    console.log(userDetails);

    if (userDetails.length > 0) {
      if (userDetails[0].password == decryptedToken.password) {
        let details = {
          firstName: userDetails[0].firstName,
          lastName: userDetails[0].lastName,
          age: userDetails[0].age,
          email: userDetails[0].email,
          profilePic: userDetails[0].profilePic,
        };

        res.json({ status: "success", data: details });
      } else {
        res.json({ status: "failure", msg: "Invalid Password." });
      }
    } else {
      res.json({ status: "failure", msg: "User doesnot exist." });
    }
  } catch (err) {
    res.json({ status: "failure", msg: "Invalid Token", err: err });
  }
});

app.post("/signup", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  console.log(req.file);

  let hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: hashedPassword,
      mobileNo: req.body.mobileNo,
      profilePic: req.file.path,
    });

    await User.insertMany([newUser]);
    console.log("Saved successfully");
    res.json({ status: "success", msg: "Account created Successfully." });
  } catch (err) {
    console.log("Unable to save");
    res.json({ status: "failure", msg: "Unable to create account." });
  }
});

app.put("/updateProfile", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);

  try {
    if (req.body.firstName.trim().length > 0) {
      await User.updateMany(
        { email: req.body.email },
        { firstName: req.body.firstName }
      );
    }

    if (req.body.lastName.trim().length > 0) {
      await User.updateMany(
        { email: req.body.email },
        { lastName: req.body.lastName }
      );
    }

    if (req.body.age.trim().length > 0) {
      await User.updateMany({ email: req.body.email }, { age: req.body.age });
    }

    if (req.body.password.trim().length > 0) {
      await User.updateMany(
        { email: req.body.email },
        { password: req.body.password }
      );
    }

    if (req.body.mobileNo.trim().length > 0) {
      await User.updateMany(
        { email: req.body.email },
        { mobileNo: req.body.mobileNo }
      );
    }

    if (req.file) {
      await User.updateMany(
        { email: req.body.email },
        { profilePic: req.file.path }
      );
    }
    res.json({ status: "success", msg: "Profile updated successfully." });
  } catch (err) {
    res.json({ status: "failure", msg: "Unable to update profile", err: err });
  }
});

app.delete("/deleteProfile", upload.none(), async (req, res) => {
  try {
    await User.deleteMany({ email: req.body.email });
    res.json({ status: "success", msg: "User deleted successfully." });
  } catch (err) {
    res.json({ status: "failure", msg: "Unable to delete user", err: err });
  }
});

app.listen(process.env.port, () => {
  console.log("Listening to port 4567");
});

let connectToMDB = async () => {
  try {
    mongoose.connect(process.env.mdbURL);
    console.log("connected to MDB Successfully");
  } catch (err) {
    console.log("Unable to connect to MDB");
  }
};

connectToMDB();
