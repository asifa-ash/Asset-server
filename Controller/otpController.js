import nodemailer from "nodemailer";
import UserModel from "../Model/UserModel.js";
import jwt from "jsonwebtoken";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "asifashahid2@gmail.com",
    pass: "sudnmlvmtjqesnrx",
  },
});

export const sendOtp = async (req, res) => {
  console.log(req.body), "kkkkkkkkkkkkkk";
  const { email } = req.body;
  if (!email) {
    res.status(401).json({ status: 401, message: "Enter your email" });
  }

  try {
    const userFind = await UserModel.findOne({ email: email });
    console.log(userFind, "usermmmmmmm");
    // token generate for reset password
    const vToken = jwt.sign({ _id: userFind._id }, "abcdefg", {
      expiresIn: "120s",
    });
    console.log(vToken, "vtokennnn");
    const setVerifyToken = await UserModel.findByIdAndUpdate(
      { _id: userFind._id },
      { verifyToken: vToken },
      { new: true }
    );
    console.log(setVerifyToken, "lklkl");

    if (setVerifyToken) {
      const mailOption = {
        from: "asifashahid2@gmail.com",
        to: email,
        subject: "Sending Email for password Reset",
        text: `This Link Valid For 2 MINUTES http://localhost:3000/authentication/new-pass/${userFind.id}/${setVerifyToken.verifyToken}`,
      };
      transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          console.log(error, "error");
          res.status(401).json({ status: 401, message: "email not  send" });
        } else {
          console.log("email sent", info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email sent Successfully " });
        }
      });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: "invalid user" });
  }
};

// verify user forget password time
export const getOtp = async (req, res) => {
  const { id, token } = req.params;

  console.log(id, token, "mmmm");
  try {
    const validUser = await UserModel.findOne({ _id: id, verifyToken: token });
    console.log(validUser,"valid");

    const verifyToken = jwt.verify(token, "abcdefg");
    if (validUser && verifyToken._id) {
      res.status(201).json({ status: 201, validUser });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};
