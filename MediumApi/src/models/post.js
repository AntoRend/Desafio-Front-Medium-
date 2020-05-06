const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        //maxlength: 30,
        required: true
    },
    subtitle: {
        type: String,
        minlength: 5,
        //maxlength: 50,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    content: {
        type: String,
        minlength: 50,
        required: true
    },
    references: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: true
    },
    estimatedReadTime: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    clicks: {
        type: Number,
        required: true,
        //default : 0
    }

})

module.exports = mongoose.model('posts', postSchema)