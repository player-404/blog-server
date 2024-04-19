import { catchAsyncError } from "../utils/errorHandle";
import { AppError } from "../utils/errorHandle";
import User from "../model/userModel";
import Client from "../utils/sms";
import Redis from "../utils/redis";

// 注册
export const signUp = catchAsyncError(async (req, res, next) => {
  const { username, password, confirmPassword, phone, code } = req.body;

  // 验证码验证
  if (!Redis.verifyCode(phone, code)) {
    return next(new AppError(501, "验证码错误"));
  }
  const user = await User.create({
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
  const user = await User.findOne({ phone });
  if (user) {
    return next(new AppError(500, "手机号已注册"));
  }
  if (await Redis.getCode(phone)) {
    return next(new AppError(501, "验证码发送频繁，请稍后再试"));
  }
  // 生成验证码
  const code = Client.generateCode();
  // 发短信
  await Client.sendSMS(phone, code);
  await Redis.setCode(phone, code, 60 * 5);
  res.status(200).json({
    msg: "发送成功",
    code,
  });
});

// 登录
export const loginUsername = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username })
    .select("+password")
    .populate({
      path: "roles",
      populate: {
        path: "menu",
      },
    });
  if (!user) {
    return next(new AppError(401, "用户名不存在"));
  }
  const status = await (user as any).comparePassword(password);
  if (!status) {
    return next(new AppError(401, "密码错误"));
  }

  const token = (user as any).createToken(user._id as any);

  // 登录成功返回用户数据，返回的数据中隐藏 pasword 数据
  const users = user.toObject({
    transform: (doc, ret) => {
      delete ret.password;
      return ret;
    },
  });

  res
    .status(201)
    .cookie("jwt", token, {
      maxAge: Number(process.env.COOKIE_MAXAGE) * 1000 ?? 24 * 60 * 60 * 1000,
    })
    .json({
      code: 201,
      msg: "登录成功",
      token,
      data: {
        user: users,
      },
    });
});

// 手机验证码登录
export const loginPhone = catchAsyncError(async (req, res, next) => {});
