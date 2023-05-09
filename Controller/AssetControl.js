import mongoose from "mongoose";
import UserModel from "../Model/UserModel.js";
import assetModel from "../Model/assetModel.js";
import ProductModel from "../Model/ProductModel.js";
export const uploadAsset = async (req, res) => {
  console.log(req.body, req.file, "kkkkk");
  try {
    console.log(req.body,"bbbbbbbbbbbb");
    const {userId}=req.body;
    req.body.userId= new mongoose.Types.ObjectId(userId)
    const assetData = assetModel({ ...req.body, image: req.file });
    const uploadAsset = await assetData.save();
    const user = await ProductModel.findById(req.body.userId);
    console.log(user,"userrrrrrrrrrr");
    user.asset.push(uploadAsset._id)
    
    await user.save()
    res.status(201).json({message:"asset upload successfully ....",uploadAsset,user})
  } catch (err) {
    console.log(err);
  }
};

export const getAllAsset = async (req, res) => {
  try {
    const allAsset = await assetModel.find();
    console.log(allAsset, "hhghh");

    res.status(201).json(allAsset);
  } catch (err) {
    console.log(err);
  }
};
export const getAsset = async (req, res) => {
  const id = req.params.id;
  try {
    const asset = await assetModel.findOne(id);
    res.status(200).json({ message: " asset data get successful", asset });
  } catch (error) {
    res.status(404).json({ message: "asset data not available", error });
  }
};
export const updateAsset = async (req, res) => {
  const id = req.params.id;
  try {
    const assetData = await assetModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "asset data updated successfully", assetData });
  } catch (error) {
    res.status(404).json({ message: "asset data not updated", error });
  }
};



export const deleteAsset = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteAsset = await assetModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "user data deleted successfully", deleteAsset });
  } catch (error) {
    res.status(404).json({ message: "user data delete failed", error });
  }
};
