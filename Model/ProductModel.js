import mongoose from "mongoose";
const ProductSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    title: { type: String, required: true },
    DOB: { type: String, required: true },
    department: { type: String, required: true },
    reporting_manager: { type: String, required: true },
    joining_date: { type: String },
    email: { type: String, required: true },
    // status: { type: String, required: true },
    location: { type: String, required: true },
    userType: { type: String, required: true },
    contractType: { type: String, required: true },
    // photo: { type:{}, required: true },
    asset:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Asset'}],
    
   
  },
  { timestamps: true }
);
const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
