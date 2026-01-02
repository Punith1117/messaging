const { getUsersController } = require('../controllers/user.controller')
const { protected } = require('../middleware')

const userRouter = require('express').Router()

userRouter.get('/', protected, getUsersController)

module.exports = userRouter