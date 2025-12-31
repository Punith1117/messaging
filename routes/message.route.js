const messageRouter = require('express').Router()
const { sendMessageController } = require('../controllers/message.controller')
const { protected } = require('../middleware')

messageRouter.post('/', protected, sendMessageController)

module.exports = messageRouter