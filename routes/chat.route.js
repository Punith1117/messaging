const { updateChatStatusController } = require('../controllers/chat.controller')
const { protected } = require('../middleware')

const chatRouter = require('express').Router()

chatRouter.post('/:otherUserId/:newStatus', protected, updateChatStatusController)

module.exports = chatRouter