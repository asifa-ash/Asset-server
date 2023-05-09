import mongoose from "mongoose";
const UserSchema = mongoose.Schema(
  {
    // username: { type: String },
    password: { type: String },

    role: { type: String, enum: ["user", "admin"] },
    accessToken: { type: String},

    refreshToken: { type: String },
    verifyToken: { type: String },

    firstName: { type: String},
    lastName: { type: String},
    title: { type: String },
    DOB: { type: String},
    department: { type: String},
    reporting_manager: { type: String},
    joining_date: { type: String },
    email: { type: String},
    
    location: { type: String },
    userType: { type: String },
    contractType: { type: String},
    asset:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Asset'}],

  },
  { timestamps: true }
);
const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
