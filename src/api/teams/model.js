const mongoose = require('mongoose')

const Schema = mongoose.Schema

const team = new Schema({
  stats: { type: mongoose.SchemaTypes.Mixed, required: false },
  stat: { type: String, required: true },
  link: { type: String, required: true },
  logo: { type: String, required: true },
  code: { type: String, required: true },
  name: { type: String, required: true },
  leagueId: { type: mongoose.SchemaTypes.ObjectId, required: true }
})

module.exports = mongoose.model('Team', team)
