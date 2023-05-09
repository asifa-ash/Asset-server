import UserModel from "../Model/UserModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { createToken } from "../utils/createToken.js";
import router from "../Routes/otp.js";

export const register = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  const sault = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, sault);
  req.body.password = hashPassword;
  try {
    const oldUser = await UserModel.findOne({ username });
    if (oldUser) {
      return res.status(409).json({ message: "user already exist" });
    }
    const user = UserModel(req.body);

    // token.............
    user.accessToken = createToken({ userId: user._id }, "15");
    user.refreshToken = createToken({ userId: user._id }, "30d");

    await user.save();
    res.cookie("token", user.refreshToken);

    const data = { username };
    return res.status(200).json({
      // data,
      // token: user.accessToken,
      message: "user registered successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

// login

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, "hhhhhh");
  try {
    const user = await UserModel.findOne({ email: email });
    console.log(user, "bbbbbbb");

    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        return res.status(400).json("wrong Password");
      } else {
        // token...........
        user.accessToken = createToken({ userId: user._id }, "15");
        user.refreshToken = createToken({ userId: user._id }, "30d");
        await user.save();
        console.log(user.refreshToken, "tokenn");
        console.log("succfully");
        res.cookie("token", user.refreshToken, {
          sameSite: "none",
          secure: true,
          httpOnly: true,
        });
        return res.status(200).json({
          user,
          token: user.accessToken,
          message: "successfully login",
        });
      }
    } else {
      return res.status(204).json({ message: "user not fount" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// logout

export const logout = async (req, res) => {
  res
    .cookie("token", null, { maxAge: 0 })
    .status(200)
    .send("successfully logout");
};

// reset Password.......................

export const reSetPass = async (req, res) => {
  console.log(req.body, "jpass");
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    const validUser = await UserModel.findOne({ _id: id, verifyToken: token });
    const verifyToken = jwt.verify(token, "abcdefg");
    if (validUser && verifyToken._id) {
      const newPassword = await bcrypt.hash(password, 10);
      const setNewPass = await UserModel.findByIdAndUpdate(
        { _id: id },
        { password: newPassword }
      );
      setNewPass.save();

      res.status(201).json({ status: 201, setNewPass });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};
