import mongoose from "mongoose";
import { Schema } from "mongoose";

const PerMenuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: String,
  desc: String,
  icon: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "PerMenu",
  },
  createTime: {
    type: Date,
    default: Date.now(),
  },
  updateTime: Date,
});

const PerMenu = mongoose.model("PerMenu", PerMenuSchema);

export default PerMenu;
