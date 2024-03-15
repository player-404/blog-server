import mongoose from "mongoose";
const { Schema } = mongoose;

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
    unique: true,
    validate: {
      validator: (value: string) => {
        const reg =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(value);
      },
      message: "邮箱格式不正确",
    },
  },
});

userSchema.pre("save", async function (next: Function) {
  this.confirmPassword = "";
  next();
});
const model = mongoose.model("User", userSchema);

export default model;
