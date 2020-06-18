const mongoose = require('mongoose')

const Schema = mongoose.Schema

const player = new Schema({
  age: { type: String, required: true },
  code: { type: String, required: true },
  country: { type: String, required: true },
  height: { type: String, required: true },
  link: { type: String, required: true },
  logo: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  stats: { type: mongoose.SchemaTypes.Mixed, required: true },
  teamId: { type: mongoose.SchemaTypes.ObjectId, required: true }
})

module.exports = mongoose.model('Player', player)
