import dotenv from "dotenv";
dotenv.config();
import catchAsync from "../utils/catchAsync.js";
import UserService from "../services/user.service.js";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
class UserController {
  createUser = catchAsync(async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS, 10)
    );
    const user = await UserService.createUser({
      name,
      email,
      password: hashedPassword,
    });
    res
      .status(httpStatus.CREATED)
      .json({ success: true, message: "User created successfully", user });
  });

  getUsers = catchAsync(async (req, res) => {
    const users = await UserService.getUsers();
    res
      .status(httpStatus.OK)
      .json({ success: true, message: "Users fetched successfully", users });
  });
}

export default new UserController();
