const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  cover: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  description: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  githuburl: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  projecturl: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Projects', userSchema)
