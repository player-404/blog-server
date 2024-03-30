import mongoose, { Schema } from "mongoose";

const PerMenuSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "nama不能为空"],
  },
  type: String,
  desc: String,
  icon: {
    type: String,
  },
  path: {
    type: String,
    unique: true,
    required: [true, "path不能为空"],
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "PerMenu",
  },
  level: {
    type: Number,
  },
  createTime: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  updateTime: Date,
});

const PerMenu = mongoose.model("PerMenu", PerMenuSchema);

export default PerMenu;
