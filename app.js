const express = require('express')
const { healthRouter } = require('./routes/health.route')
const app = express()
require('dotenv').config()

app.use('/health', healthRouter)

app.listen(process.env.PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Express app listening on port ${process.env.PORT}`)
})