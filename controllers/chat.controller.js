const { getChat, updateChatStatus, getAllChats } = require("../databaseQueries")
const { ChatStatus } = require("../prisma/generated/prisma")
const { cleanChats } = require("../utils")

const updateChatStatusController = async (req, res) => {
    const userId = req.user.id
    const otherUserId = Number(req.params.otherUserId)
    const newStatus = req.params.newStatus

    if (!Number.isInteger(otherUserId)) {
        return sendMessageJson(res, "Other user id must be an integer", true, 400)
    }

    if (!Object.values(ChatStatus).includes(newStatus)) {
        return sendMessageJson(res, "Invalid chat status", true, 400)
    }

    const user1Id = Math.min(userId, otherUserId)
    const user2Id = Math.max(userId, otherUserId)

    const chat = await getChat(user1Id, user2Id)

    if (!chat) {
        return sendMessageJson(
            res,
            "This chat does not exist. Message the user first to create new chat",
            true,
            404
        )
    }

    const { status, statusUpdatedBy } = chat

    // PENDING → ACCEPTED (only receiver)
    if (status === ChatStatus.pending) {
        if (userId === statusUpdatedBy) {
            return sendMessageJson(res, "You cannot accept your own chat invite", true, 403)
        }

        if (newStatus !== ChatStatus.accepted) {
            return sendMessageJson(res, "Invalid status transition", true, 400)
        }

        await updateChatStatus(user1Id, user2Id, userId, ChatStatus.accepted)
        return sendMessageJson(res, "Chat is successfully accepted")
    }

    // ACCEPTED → BLOCKED (anyone)
    if (status === ChatStatus.accepted) {
        if (newStatus !== ChatStatus.blocked) {
            return sendMessageJson(res, "Invalid status transition", true, 403)
        }

        await updateChatStatus(user1Id, user2Id, userId, ChatStatus.blocked)
        return sendMessageJson(res, "Chat is successfully blocked")
    }

    // BLOCKED → ACCEPTED (only blocker)
    if (status === ChatStatus.blocked) {
        if (newStatus !== ChatStatus.accepted || userId !== statusUpdatedBy) {
            return sendMessageJson(res, "You do not have access to perform this request", true, 403)
        }

        await updateChatStatus(user1Id, user2Id, userId, ChatStatus.accepted)
        return sendMessageJson(res, "You have successfully unblocked the chat")
    }

    return sendMessageJson(res, "You do not have access to perform this request", true, 403)
}

const getAllChatsController = async (req, res) => {
    const userId = req.user.id
    
    const uncleanedChats = await getAllChats(userId) // Here, every element contains data of both current and other user which is unnecessary

    const chats = cleanChats(userId, uncleanedChats)

    res.json({
        chats
    })
}

const sendMessageJson = (res, message, isError, statusCode) => {
    if (isError) {
        res.status(statusCode).json({
            error: {
                message
            }
        })
        return
    }

    res.json({
        message
    })
}

module.exports = {
    updateChatStatusController,
    getAllChatsController
}