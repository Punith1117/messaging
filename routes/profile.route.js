const { updateProfileController } = require('../controllers/profile.controller')
const { protected } = require('../middleware')

const profileRouter = require('express').Router()

profileRouter.patch('/', protected, updateProfileController)

module.exports = profileRouter