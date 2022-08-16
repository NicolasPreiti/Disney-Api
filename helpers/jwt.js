const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateToken = (body) => {
  const token = jwt.sign({ body }, config.JWT_SECRET, { expiresIn: '1d' });

  return token;
};

const verifyToken = (token) => {
  const verifiedToken = jwt.verify(token, config.JWT_SECRET);

  return verifiedToken;
};

module.exports = {
  generateToken,
  verifyToken,
};
