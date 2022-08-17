const { User } = require('../models');
const { encryptPassword, comparePassword } = require('../helpers/hash');

const registerUser = async(body) => {
  try {
    const { email, password } = body;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) return false;
    const passwordHash = await encryptPassword(password);

    return await User.create({
      email,
      password: passwordHash,
    });
  } catch (err) {
    throw new Error(err);
  }
};

const loginUser = async(body) => {
  try {
    const { email, password } = body;
    const user = await User.findOne({ where: { email } });

    const match = !user
      ? false
      : await comparePassword(password, user.password);

    if (!match) return false;
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
