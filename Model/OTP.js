import mongoose from "mongoose";
const OtpSchema = mongoose.Schema(
  {
    verifyToken: { type: String,  },
      
  },
  { timestamps: true }
);
const OtpModel = mongoose.model("otp",OtpSchema);
export default OtpModel;
