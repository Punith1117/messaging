const express = require('express')
const passport = require('passport')
const { healthRouter } = require('./routes/health.route')
const authRouter = require('./routes/auth.route')
const app = express()
app.use(express.json())
app.use(passport.initialize())
require('dotenv').config()

app.use('/health', healthRouter)
app.use('/auth', authRouter)

app.listen(process.env.PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Express app listening on port ${process.env.PORT}`)
})