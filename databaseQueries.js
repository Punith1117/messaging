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
            statusUpdatedBy: initiatorId,
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

const getMessages = async (userId, otherUserId, cursor, limit) => {
    const messages = await prisma.message.findMany({
        where: {
            OR: [
            { fromId: userId, toId: otherUserId },
            { fromId: otherUserId, toId: userId },
            ],
        },
        orderBy: {
            createdAt: "desc",
        },
        take: limit + 1,
        ...(cursor && {
            cursor: { id: cursor },
            skip: 1,
        }),
    });

    return messages
}

const updateChatStatus = async (user1Id, user2Id, statusUpdatedBy, newStatus) => {
    await prisma.chat.update({
        where: {
            user1Id_user2Id: {
                user1Id,
                user2Id
            }
        },
        data: {
            status: newStatus,
            statusUpdatedBy
        }
    })
}

const getAllChats = async (userId) => {
    const chats = await prisma.chat.findMany({
        where: {
            OR: [
                {
                    user1Id: userId
                },
                {
                    user2Id: userId
                }
            ]
        },
        include: {
            user1: {
                select: {
                    id: true,
                    username: true,
                    casualName: true
                }
            },
            user2: {
                select: {
                    id: true,
                    username: true,
                    casualName: true
                }
            }
        }
    })

    return chats
}

const updateProfile = async (userId, {casualName, mood}) => {
    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            casualName,
            mood
        }
    })
}

const getProfile = async (userId, getMood) => {
    if (!getMood) getMood = false
    
    const profile = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            username: true,
            casualName: true,
            mood: getMood
        }
    })
    
    return profile
}

module.exports = {
    userAlreadyExists,
    createUser,
    getUserAuthDetails,
    getUserDetails,
    getChat,
    createChat,
    addMessage,
    getMessages,
    updateChatStatus,
    getAllChats,
    updateProfile,
    getProfile
}