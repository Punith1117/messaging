const { updateProfileController, getProfileController } = require('../controllers/profile.controller')
const { protected } = require('../middleware')

const profileRouter = require('express').Router()

profileRouter.patch('/', protected, updateProfileController)
profileRouter.get('/', protected, getProfileController)
profileRouter.get('/:id', protected, getProfileController)

module.exports = profileRouter