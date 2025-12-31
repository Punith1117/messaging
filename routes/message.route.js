const messageRouter = require('express').Router()
const { sendMessageController, getMessagesController } = require('../controllers/message.controller')
const { protected } = require('../middleware')

messageRouter.post('/', protected, sendMessageController)
messageRouter.get('/:userId', protected, getMessagesController)

module.exports = messageRouter