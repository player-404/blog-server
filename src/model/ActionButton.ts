import mongoose from "mongoose";
import { Schema } from "mongoose";

const ActionButtonSchema = new Schema({
  name: {
    type: String,
    required: [true, "nama不能为空"],
  },
  desc: String,
  path: {
    type: String,
    required: [true, "path不能为空"],
  },
  icon: {
    type: String,
    required: [true, "icon不能为空"],
  },
  active: {
    type: Boolean,
    default: true,
  },
  type: String,
  createTime: {
    type: Date,
    default: Date.now(),
  },
  updateTime: {
    type: Date,
  },
});

const ActionButton = mongoose.model("PerButton", ActionButtonSchema);

export default ActionButton;
