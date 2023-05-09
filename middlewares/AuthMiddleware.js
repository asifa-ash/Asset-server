import jwt from "jsonwebtoken";

import UserModel from "../Model/UserModel.js";
import { createToken } from "../utils/createToken.js";

export const Auth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      console.log("three");
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    // verify token
    try {
      const { userId } = jwt.verify(token, "abcdefg");
      console.log(userId, "gfgfgfgf");
      const user = await UserModel.findById(userId);
      if (!user || user.accessToken != token) {
        return res.status(401).json({ message: "Invalid user" });
      }
      req.user = user;
      return next();
    } catch (err) {
      if (err.message == "invalid signature") {
        console.log("one");
        return res.status(401).json({ message: "Unauthorized Access" });
      
      }
      if (err.message == "jwt expired") {
        // console.log(req.cookies,"cokies");
        // const refreshToken = req.cookies?.token;

        // if (!refreshToken) {

        //   console.log("two");
        //   return res.status(401).json({ message: "Unauthorized Access" });
        // }
        // try {
        //   const verify = jwt.verify(refreshToken, "abcdefg");
        //   // find user from database
        //   const userData = await UserModel.findById(verify.userId);
        //   // not userData
        //   if (!userData || userData.refreshToken != refreshToken) {
        //     return res.status(401).json({ message: "Invalid user" });
        //   }

        //   userData.accessToken = createToken({ userId: userData._id }, "15");
        //   userData.refreshToken = createToken({ userId: userData._id }, "30d");
        //   await userData.save();
        //   res.cookie("token", userData.refreshToken);
        //   req.user = userData;
        //   return next();
        // } catch (err) {
        //   if (err.message === "jwt expired") {
        //     return res.status(401).json({
        //       success: false,
        //       message: "Session expired. Please login again.",
        //     });
        //   }
        //   if (err.message == "invalid signature") {
        //     console.log("four");
        //     return res.status(401).json({ message: "Unauthorized Access" });
        //   }
        // }

        throw err
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
