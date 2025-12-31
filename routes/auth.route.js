const { signUpController } = require('../controllers/auth.controller')

const authRouter = require('express').Router()

authRouter.post('/signup', signUpController)

module.exports = authRouter