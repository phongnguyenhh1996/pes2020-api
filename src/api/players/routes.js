require('./model')
const controller = require('./controller')

const express = require('express')

const router = express.Router()

router.get('/crawAllPlayers', controller.crawAllPlayers)
router.get('/allPlayersInTeam', controller.allPlayersInTeam)

module.exports = router
