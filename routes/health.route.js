const { healthController } = require('../controllers/health.controller')

const healthRouter = require('express').Router()

healthRouter.get('/', healthController)

module.exports = {
    healthRouter
}