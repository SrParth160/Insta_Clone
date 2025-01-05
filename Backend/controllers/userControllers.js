const userService = require("../services/userService"); // Ensure this file has the necessary methods
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
const { verifyToken, createToken } = require("../middlewares/auth");
const USER = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT_ = "mysecretkey";

exports.signup = async (req, res) => {
  const { name, userName, email, password } = req.body;
  if (!name || !email || !userName || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  try {
    const existingUser = await userService.findUserByEmailOrUserName(
      email,
      userName
    );
    if (existingUser) {
      return res
        .status(422)
        .json({ error: "User already exists with that email or userName" });
    }

    const hashedPassword = await userService.hashPassword(password);
    await userService.createUser({
      name,
      userName,
      email,
      password: hashedPassword,
    });
    res.json({ message: "Registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(422).json({ error: "Please add email and password" })
//     }
//     USER.findOne({ email: email }).then((savedUser) => {
//         if (!savedUser) {
//             return res.status(422).json({ error: "Invalid email" })
//         }
//         bcrypt.compare(password, savedUser.password).then((match) => {
//             if (match) {
//                 // return res.status(200).json({ message: "Signed in Successfully" })
//                 const token = jwt.sign({ _id: savedUser.id }, JWT_SECRET)
//                 const { _id, name, email, userName } = savedUser

//                 res.json({ token, user: { _id, name, email, userName } })

//                 console.log({ token, user: { _id, name, email, userName } })
//             } else {
//                 return res.status(422).json({ error: "Invalid password" })
//             }
//         })
//             .catch(err => console.log(err))
//     })
// }

exports.login = async (req, res) => {
  const body = req.body;
  const email = req.body.email;
  const password = req.body.password;
  console.log(password);

  const findUser = await userService.findUserByEmail(email);

  console.log(findUser);

  if (!findUser) {
    res.status(500).json({
      error: "User not found",
    });
  } else {
    const pass = await bcrypt.compare(password, findUser.password);
    if (pass) {
      let data = {
        _id: findUser._id,
        email: findUser.email,
      };
      console.log(data);

      const token = jwt.sign({ data }, JWT_);
      
      res.json(token);

      // res.cookie("login_token", token);

      // res.status(200).json({
      //   message: "login success",
      // });
    } else {
      res.status(500).json({
        error: "Enter valid password",
      });
    }
  }
};
