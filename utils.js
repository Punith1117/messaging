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

const cleanChats = (userId, chats) => {
	return chats.map(chat => {
		const user =
			chat.user1.id === userId ? chat.user2 : chat.user1

		return {
			id: chat.id,
			status: chat.status,
			statusUpdatedBy: chat.statusUpdatedBy,
			createdAt: chat.createdAt,
			user
		}
	})
}

module.exports = {
    isValidUsername,
    isValidPassword,
    hashPassword,
    comparePassword,
    getNewToken,
	cleanChats
}
