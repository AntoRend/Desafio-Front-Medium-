const express = require('express')

const postRouter = require('./routes/post')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')

const app = express()

app.use(express.json())

app.use('/posts', postRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)

module.exports = app