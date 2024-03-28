import mongoose from "mongoose";
import { Schema } from "mongoose";

const PerMenuSchema = new Schema({
  name: {
    type: String,
    required: [true, "nama不能为空"],
  },
  type: String,
  desc: String,
  icon: {
    type: String,
    required: [true, "icon不能为空"],
  },
  path: {
    type: String,
    required: [true, "path不能为空"],
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
