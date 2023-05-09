import mongoose from "mongoose";
const AssetSchema = mongoose.Schema(
  {
    fName: { type: String},
    type: { type: String},
    manufacturer: { type: String},
    model: { type: String},
    Serial_number: { type: String },
    status: { type: String },
    WarrantyType: { type: String},
    WarrantyExpiry: { type: String },

    
    sla: { type: String },

    photo: { type: {} },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);
const assetModel = mongoose.model("Asset", AssetSchema);
export default assetModel;
