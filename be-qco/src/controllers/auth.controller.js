import jwt from "jsonwebtoken";
import { findUserBySignId } from "../models/user.model.js";

export const login = async (req, res) => {
  try {
    const { userSignId, password } = req.body;

    if (!userSignId || !password) {
      return res.status(400).json({
        message: "User_Sign_ID và Password là bắt buộc",
      });
    }

    const user = await findUserBySignId(userSignId);

    if (!user) {
      return res.status(401).json({
        message: "User không tồn tại",
      });
    }

    // Nếu DB đang lưu password thường → so sánh trực tiếp

    if (user.User_Password !== password) {
      return res.status(401).json({
        message: "Sai mật khẩu",
      });
    }

    // TẠO TOKEN
    const token = jwt.sign(
      {
        userSignId: user.User_Sign_ID,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      }
    );

    return res.json({
      message: "Đăng nhập thành công",
      token,
      user: {
        userSignId: user.User_Sign_ID,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi server",
    });
  }
};
