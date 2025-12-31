const bcrypt = require('bcryptjs')

const isValidUsername = (username) => {
  return /^[A-Za-z0-9_]+$/.test(username);
}

const isValidPassword = (password) => {
  if (typeof password !== "string") return false;
  if (password.length === 0) return false;  // prevent empty string
  return !/\s/.test(password);
}

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
}

module.exports = {
    isValidUsername,
    isValidPassword,
    hashPassword
}
