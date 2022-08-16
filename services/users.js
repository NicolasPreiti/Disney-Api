const { Users } = require('../database/db');
const { encryptPassword, comparePassword } = require('../helpers/hash');

const registerUser = async(body) => {
  try {
    const { email, password } = body;
    const existingUser = await Users.findOne({ where: { email } });

    if (existingUser) return false;
    const passwordHash = await encryptPassword(password);

    return await Users.create({
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
    const user = await Users.findOne({ where: { email } });

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
