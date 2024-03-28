import mongoose from "mongoose";
import { Schema } from "mongoose";

const roleSchema = new Schema({
  name: {
    type: String,
    required: [true, "nama不能为空"],
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
