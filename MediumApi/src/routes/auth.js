const express = require('express')

const users = require('../usecases/users')

const router = express.Router()

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body
      const token = await users.login(email, password)
  
      res.json({
        success: true,
        message: 'Loged in',
        data: {
          token
        }
      })
    } catch (error) {
      res.status(400)
      res.json({
        success: false,
        message: error.message
      })
    }
  })

  module.exports = router