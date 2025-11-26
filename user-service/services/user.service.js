import User from "../models/user.js";

class UserService {
  createUser = async ({ name, email, password }) => {
    const user = await User.create({ name, email, password });
    return user;
  };

  getUsers = async () => {
    const users = await User.find({});
    return users;
  };
}

export default new UserService();
