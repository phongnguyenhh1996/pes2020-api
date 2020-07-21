require('./model')
const controller = require('./controller')

const express = require('express')

const router = express.Router()

router.get('/crawAllTeams', controller.crawAllTeams)

/**
 * @api {get} /teams/allTeamsInLeague Get all Teams in League
 * @apiName Get Teams
 * @apiGroup teams
 * @apiParam {String} leagueId League id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
        {
          "_id": "5eeb10e1cd8b5734f90d082f",
          "stat": "67",
          "name": "Aab",
          "logo": "https://www.pesmaster.com/pes-2020/graphics/teamlogos/e_001818.png?w=36",
          "link": "https://www.pesmaster.com/aab/pes-2020/team/1818/",
          "code": "aab",
          "leagueId": "5eeb0d9b84b5ac340b21de99",
          "__v": 0,
          "stats": {
              "attack": "66",
              "defence": "66",
              "midfield": "69"
          }
        }
      ]
 */
router.get('/allTeamsInLeague', controller.allTeamsInLeague)

module.exports = router
