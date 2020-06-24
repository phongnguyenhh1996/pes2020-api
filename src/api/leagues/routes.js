require('./model')
const controller = require('./controller')

const express = require('express')

const router = express.Router()

router.get('/crawAllLeagues', controller.crawAllLeagues)

/**
 * @api {get} /leagues/allLeagues Get all leagues
 * @apiName Get Leagues
 * @apiGroup leagues
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
        {
            "_id": "5eeb0d9b84b5ac340b21de99",
            "title": "3F Superliga",
            "logo": "https://www.pesmaster.com/pes-2020/graphics/leaguelogos/emb_0128.png?w=36",
            "link": "https://www.pesmaster.com/3f-superliga/pes-2020/league/128/",
            "code": "3f-superliga",
            "__v": 0
        },
        {
            "_id": "5eeb0d9b84b5ac340b21de90",
            "title": "AFC Champions League",
            "logo": "https://www.pesmaster.com/pes-2020/graphics/leaguelogos/emb_0008.png?w=36",
            "link": "https://www.pesmaster.com/afc-champions-league/pes-2020/league/8/",
            "code": "afc-champions-league",
            "__v": 0
        }
      ]
 */
router.get('/allLeagues', controller.allLeagues)

module.exports = router
