import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema({
  name: {
    type: String,
    required: [true, "nama不能为空"],
  },
  code: {
    type: String,
    required: [true, "code不能为空"],
  },
  active: {
    type: Boolean,
    default: true,
  },
  createTime: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  updateTime: Date,
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Permission",
    },
  ],
  menu: {
    type: Schema.Types.ObjectId,
    ref: "PerMenu",
  },
  ActionButton: {
    type: Schema.Types.ObjectId,
    ref: "ActionButton",
  },
});

const Role = mongoose.model("Role", roleSchema);

export default Role;
