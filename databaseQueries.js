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

const getChat = async (user1Id, user2Id) => {
    const chat = await prisma.chat.findUnique({
        where: {
            user1Id_user2Id: {
                user1Id,
                user2Id
            }
        }
    })

    return chat
}

const createChat = async (user1Id, user2Id, initiatorId) => {
    await prisma.chat.create({
        data: {
            user1Id,
            user2Id,
            initiatedBy: initiatorId,
            status: 'pending'
        }
    })
}

const addMessage = async (fromId, toId, content) => {
    await prisma.message.create({
        data: {
            fromId,
            toId,
            content
        }
    })
}

module.exports = {
    userAlreadyExists,
    createUser,
    getUserAuthDetails,
    getUserDetails,
    getChat,
    createChat,
    addMessage
}