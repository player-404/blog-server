import { catchAsyncError } from "../utils/errorHandle";
import { AppError } from "../utils/errorHandle";
import userModel from "../model/userModel";
import Client from "../utils/sms";

// 注册
export const signUp = catchAsyncError(async (req, res, next) => {
  const { username, password, confirmPassword, phone, code } = req.body;
  const user = await userModel.create({
    username,
    password,
    confirmPassword,
    phone,
  });
  if (!user) {
    return next(new AppError(501, "注册失败"));
  }
  res.status(201).json({
    code: 201,
    msg: "注册成功",
    data: user,
  });
});

// 验证码发送
export const sendSMS = catchAsyncError(async (req, res, next) => {
  const { phone } = req.body;
  // 生成验证码
  const code = Client.generateCode();
  // 发短信
  await Client.sendSMS(phone, code);
  (req as any).code = code;
  res.status(200).json({
    msg: "发送成功",
  });
});
