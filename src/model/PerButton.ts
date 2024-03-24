import mongoose from "mongoose";
import { Schema } from "mongoose";

const perButtonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: String,
  path: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
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

const PerButton = mongoose.model("PerButton", perButtonSchema);

export default PerButton;
