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

const getUserAuthDetails = async (username) => {
    const user = await prisma.user.findUnique({
        where: { username },
        select: {
            id: true,
            username: true,
            password: true, // hashed password
        },
    });
    return user
}

const getUserDetails = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            username: true,
            casualName: true,
        },
    });

    return user
}

module.exports = {
    userAlreadyExists,
    createUser,
    getUserAuthDetails,
    getUserDetails
}