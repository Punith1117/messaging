const { updateChatStatusController, getAllChatsController } = require('../controllers/chat.controller')
const { protected } = require('../middleware')

const chatRouter = require('express').Router()

chatRouter.get('/', protected, getAllChatsController)
chatRouter.post('/:otherUserId/:newStatus', protected, updateChatStatusController)

module.exports = chatRouter