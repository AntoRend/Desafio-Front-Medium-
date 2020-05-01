const Post = require('../models/post')

function getPost () {
    return Post.find()
}

function create (newPost) {
    return Post.create(newPost)
}

function deleteById (id) {
    return Post.findByIdAndDelete(id)
  }

function putById (id) {
    return Post.findByIdAndUpdate(id)
}

  module.exports = {
      getPost,
      create,
      deleteById,
      putById
  }