const mongoose = require('mongoose')

const Schema = mongoose.Schema

const league = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  logo: { type: String, required: true },
  code: { type: String, required: true }
})

module.exports = mongoose.model('League', league)
