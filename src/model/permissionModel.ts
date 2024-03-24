import mongoose from "mongoose";
import { Schema } from "mongoose";

const PermissionSchema = new Schema({
  active: {
    type: Boolean,
    default: true,
  },
  desc: String,
  createTime: {
    type: Date,
    default: Date.now(),
  },
  updateTime: Date,
});

const Permission = mongoose.model("Permission", PermissionSchema);
export default Permission;
