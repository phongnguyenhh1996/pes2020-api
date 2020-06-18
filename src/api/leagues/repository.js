const mongoose = require('mongoose')

const League = mongoose.model('League')

const saveAllLeagues = (arrData) => {
  return League.insertMany(arrData)
}

const getAllLeagues = () => {
  return League.find({}).sort('title').exec()
}

module.exports = {
  getAllLeagues,
  saveAllLeagues
}
