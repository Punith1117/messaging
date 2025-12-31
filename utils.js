const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

const comparePassword = async (password, hashedPassword) => {
    const result = await bcrypt.compare(password, hashedPassword)
    return result
}

const getNewToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5min' })
    return token
}

module.exports = {
    isValidUsername,
    isValidPassword,
    hashPassword,
    comparePassword,
    getNewToken
}
