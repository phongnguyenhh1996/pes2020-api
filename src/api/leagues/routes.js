require('./model')
const controller = require('./controller')

const express = require('express')

const router = express.Router()

router.get('/crawAllLeagues', controller.crawAllLeagues)
router.get('/allLeagues', controller.allLeagues)

module.exports = router
