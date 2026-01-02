const { getMoodsController } = require('../controllers/meta.controller')

const metaRouter = require('express').Router()

metaRouter.get('/moods', getMoodsController)

module.exports = metaRouter