const mongoose = require('mongoose')

const Player = mongoose.model('Player')

const saveAllPlayers = (arrData) => {
  return Player.insertMany(arrData)
}

const getAllPlayers = () => {
  return Player.find({})
    .skip(9000)
    // .limit(9000)
    .exec()
}

const getAllPlayersByTeamId = (teamId) => {
  return Player.find({ teamId }).exec()
}

const updatePlayerById = (id, update) => {
  return Player.findByIdAndUpdate(id, { playerDetail: update }, { upsert: true, new: true }).exec()
}

module.exports = {
  saveAllPlayers,
  getAllPlayersByTeamId,
  getAllPlayers,
  updatePlayerById
}
