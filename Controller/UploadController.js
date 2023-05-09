import ProductModel from "../Model/ProductModel.js";
import UserModel from "../Model/UserModel.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "asifashahid2@gmail.com",
    pass: "sudnmlvmtjqesnrx",
  },
});

export const uploadData = async (req, res) => {
  console.log(req.body, req.file, "pppp");
  const { email } = req.body;
  console.log(email, "asifa gmail");
  try {
    const productData = UserModel({ ...req.body, image: req.file });

    const upload = await productData.save();
  } catch (err) {
    console.log(err);
  }
  if (!email) {
    res.status(401).json({ status: 401, message: "Enter your email" });
  }
  try {
    const userFind = await UserModel.findOne({ email: email });
    console.log(userFind, "emailuser");
    // token generate for reset password
    const vToken = jwt.sign({ _id: userFind._id }, "abcdefg", {
      expiresIn: "120s",
    });
    console.log(vToken, "tovitovi");
    const setVerifyToken = await UserModel.findByIdAndUpdate(
      { _id: userFind._id },
      { verifyToken: vToken },
      { new: true }
    );
    console.log(setVerifyToken, "kkkhhhh");

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

// getallUser
export const getAllUser = async (req, res) => {
  try {
    const allUser = await UserModel.find({ role: "user" });
    console.log(allUser, "lllilil");

    res.status(201).json(allUser);
    // ,token:req.user.accessToken
  } catch (err) {
    console.log(err);
  }
};
// getOneUser

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await ProductModel.findById({ _id: id })
      .populate("asset")
      .select({ _id: 0, "asset.name": 1 });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "user data not available", error });
  }
};

// update

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const userData = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "user data updated successfully", userData });
  } catch (error) {
    res.status(404).json({ message: "user data not updated", error });
  }
};

// delete
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  console.log(id, "id kiti");
  try {
    const deleteUser = await UserModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "user data deleted successfully", deleteUser });
  } catch (error) {
    res.status(404).json({ message: "user data delete failed", error });
  }
};
