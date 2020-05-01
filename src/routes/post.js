const express = require('express')

const posts = require('../usecases/post')

const router = express.Router()

// GET /post
router.get('/', async (req, res) => {
    try {
        const allPost = await posts.getPost()
        res.json({
            message: 'Posts on Medium',
            data: {
                Posts: allPost
            }
        })
    } catch (error) {
        res.status(400)
        res.json({
            succes: false,
            error: error.message
        })
    }
})

// POST /post
router.post('/', async (req, res) => {
    try {
        const newPost = await posts.create(req.body)
        res.json({
            succes: true,
            message: 'Post added',
            data: {
                Post: newPost
            }
        })
    } catch (error) {
        res.status(400),
        res.json({
            success: false,
            error: error.message
        })
    }
})

// DELETE /post
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params
      const postDeleted = await posts.deleteById(id)
      res.json({
        success: true,
        message: `Post ${id} deleted`,
        data: {
          Post: postDeleted
        }
      })
    } catch (error) {
      res.status(400)
      res.json({
        success: false,
        error: error.message
      })
    }
  })


  // PUT /post
  router.put('/:id', async (req, res) => {
      try {
        const { id } = req.params
        const newContent = await posts.putById(id)
        res.json({
            success: true,
            message: `Post ${id} deleted`,
            data: {
              Post: postDeleted
            }
          })
      } catch (error) {
        res.status(400)
        res.json({
          success: false,
          error: error.message
        })
      }
  })
  module.exports = router