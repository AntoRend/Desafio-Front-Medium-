
function auth (req, res, next) {
    console.log('AUTH MIDDLEWARE')
    const { authorization: token } = req.headers
    console.log('Authorization:', token)
    try {
      const decodedToken = jwt.verify(token)
      console.log('decodedToken:', decodedToken)
      next()
    } catch (error) {
      res.status(401)
      res.json({
        success: false,
        message: 'Unauthorized'
      })
    }
  }
  
  module.exports = auth
  