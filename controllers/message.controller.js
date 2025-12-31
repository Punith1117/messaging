const { getChat, createChat, addMessage } = require("../databaseQueries")
const { ChatStatus } = require("../prisma/generated/prisma/")

const sendMessageController = async (req, res) => {
    const {id} = req.user
    const {toId, content} = req.body

    const user1Id = Math.min(id, toId) // user1id is always lesser than user2Id
    const user2Id = Math.max(id, toId)

    const chat = await getChat(user1Id, user2Id)

    if (!chat) {
        await createChat(user1Id, user2Id, id)
        await addMessage(id, toId, content)

        res.json({
            message: "New chat successfully created and message is sent"
        })
        return
    }

    if (chat.status === ChatStatus.pending) {
        res.status(403).json({ // forbidden
            error: {
                message: "You cannot send messages until chat invitation is accepted"
            }
        })
        return
    }

    if (chat.status === ChatStatus.blocked) {
        res.status(403).json({ // forbidden
            error: {
                message: "You cannot send messages in a blocked chat"
            }
        })
        return
    }

    await addMessage(id, toId, content)
    
    res.json({
        message: "Message sent successfully"
    })
}

module.exports = {
    sendMessageController
}