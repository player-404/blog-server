import mongoose from "mongoose";
import { Schema } from "mongoose";

const roleSchema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createTime: {
    type: Date,
    default: Date.now(),
  },
  updateTime: Date,
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Permission",
    },
  ],
});

const Role = mongoose.model("Role", roleSchema);

export default Role;
