const { signUpController, loginController } = require('../controllers/auth.controller')

const authRouter = require('express').Router()

authRouter.post('/signup', signUpController)
authRouter.post('/login', loginController)

module.exports = authRouter