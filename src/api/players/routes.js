require('./model')
const controller = require('./controller')

const express = require('express')

const router = express.Router()

router.get('/crawAllPlayers', controller.crawAllPlayers)

/**
 * @api {get} /players/allPlayersInTeam Get all Players in Team
 * @apiName Get Players
 * @apiGroup players
 * @apiParam {String} teamId Team id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
        {
          "_id": "5eeb2cf305f7c739ba3a88bb",
          "stats": {
              "ovr": "73",
              "pas": "64",
              "sht": "45",
              "str": "74",
              "def": "65",
              "spd": "60",
              "dri": "60"
          },
          "name": "J. Rinne",
          "logo": "https://www.pesmaster.com/pes-2020/graphics/players/player_117357.png",
          "link": "https://www.pesmaster.com/j-rinne/pes-2020/player/117357/",
          "country": "https://www.pesmaster.com/pes-2019/graphics/nteamlogos/flag_SWE.png?w=40",
          "age": "26",
          "height": "188",
          "position": "GK",
          "code": "j-rinne",
          "teamId": "5eeb10e1cd8b5734f90d082f",
          "__v": 0
        },
      ]
 */
router.get('/allPlayersInTeam', controller.allPlayersInTeam)

module.exports = router
