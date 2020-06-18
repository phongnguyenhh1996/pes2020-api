require('./model')
const controller = require('./controller')

const express = require('express')

const router = express.Router()

router.get('/crawAllTeams', controller.crawAllTeams)
router.get('/allTeamsInLeague', controller.allTeamsInLeague)

module.exports = router
