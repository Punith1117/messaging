const prisma = require('./prisma/prismaClient')

const userAlreadyExists = async (username) => {
    const user = await prisma.user.findUnique({
        where: {
            username
        }
    })
    if (user) return true
    return false
}

const createUser = async (username, password, casualName) => {
    await prisma.user.create({
        data: {
            username,
            password,
            casualName
        }
    })
} 

module.exports = {
    userAlreadyExists,
    createUser
}