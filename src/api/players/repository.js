const mongoose = require('mongoose')

const Player = mongoose.model('Player')

const saveAllPlayers = (arrData) => {
  return Player.insertMany(arrData)
}

const getAllPlayersByTeamId = (teamId) => {
  return Player.find({ teamId }).exec()
}

module.exports = {
  saveAllPlayers,
  getAllPlayersByTeamId
}
