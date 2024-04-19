import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/errorHandle";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "用户名不能为空"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "密码不能为空"],
    validate: {
      validator: (value: string) => {
        const reg =
          /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/;
        return reg.test(value);
      },
      message: "密码需要包含数字、字母、特殊字符中的三位",
    },
    select: false,
  },
  confirmPassword: {
    type: String || undefined,
    required: [true, "请输入确认密码"],
    validate: {
      validator: function (value: string) {
        return (this as any).password === value;
      },
      message: "两次输入的密码不一致",
    },
    select: false,
  },
  phone: {
    type: String,
    unique: true,
    required: [true, "手机号不能为空"],
    validate: {
      validator: (value: string) => {
        const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
        return reg.test(value);
      },
      message: "手机号格式不正确",
    },
  },
  email: {
    type: String,
    validate: {
      validator: (value: string) => {
        const reg =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(value);
      },
      message: "邮箱格式不正确",
    },
  },
  createAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  passwordChangeAt: {
    type: Date,
    select: false,
  },
  roles: {
    type: [Schema.Types.ObjectId],
    ref: "Role",
    default: ["66081ce9f9585be54a14462c"],
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next: Function) {
  this.confirmPassword = "";
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// 密码验证
userSchema.methods.comparePassword = async function (password: string) {
  console.log("hash", this.password, "text", password);
  return await bcrypt.compare(password, this.password);
};

// 创建token
userSchema.methods.createToken = function () {
  console.log("key", process.env.JWT_SECRET);
  const token = jwt.sign(
    { id: this._id, iat: Date.now() },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRSE,
    },
  );
  return token;
};

const model = mongoose.model("User", userSchema);
export default model;
