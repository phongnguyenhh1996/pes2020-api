const mongoose = require('mongoose')

const Team = mongoose.model('Team')

const saveAllTeams = (arrData) => {
  return Team.insertMany(arrData)
}

const getAllTeams = () => {
  return Team.find({}).exec()
}

const updateTeamById = (id, update) => {
  return Team.findByIdAndUpdate(id, update, { upsert: true }).exec()
}

const getAllteamsByLeagueId = (leagueId) => {
  return Team.find({ leagueId }).exec()
}

const getTeamsByStat = (stat) => {
  return Team.find({stat: {$gte: stat}})
}

module.exports = {
  saveAllTeams,
  getAllTeams,
  updateTeamById,
  getAllteamsByLeagueId,
  getTeamsByStat
}
