const bcrypt = require('bcrypt')

const User = require('../models/users')
const jwt = require('../lib/jwt')

async function signup (userData) {
    const { email, password } = userData
    if (!email) throw new Error('Email is required')
    if (!password) throw new Error('password is required')
  
    const userAlreadyExist = await User.findOne({ email })
  
    if (userAlreadyExist) throw new Error('Email is already registered')
    if (password.length < 6) throw new Error('Password must be 6 characters minimun')
    const hash = await bcrypt.hash(password, 10)
  
    return User.create({ ...userData, password: hash })
  }

  async function login (email, password) {
  const user = await User.findOne({ email })
  if (!user) throw new Error('Invalid data')

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) throw new Error('Invalid data')

  return jwt.sign({ id: user._id })
}

module.exports = {
    signup,
    login
}