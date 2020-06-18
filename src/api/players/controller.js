const repository = require('./repository')
const teamsRepository = require('../teams/repository')
const cheerio = require('cheerio')
const fetchData = require('../../utils/fetchData')
const base = 'https://www.pesmaster.com'

exports.crawAllPlayers = async (req, res) => {
  const teams = await teamsRepository.getAllTeams()
  const allPlayers = []
  const getPlayer = async (team) => {
    const teamPage = await fetchData(team.link)
    const $ = cheerio.load(teamPage.data)
    const players = $('#search-result-table tbody tr')
    const statsBlocks = $('.stat-donut-block')
    const stats = {
      attack: statsBlocks.eq(3).find('.stat').text(),
      defence: statsBlocks.eq(1).find('.stat').text(),
      midfield: statsBlocks.eq(2).find('.stat').text()
    }
    await teamsRepository.updateTeamById(team._id, { stats })
    const playersInTeam = []
    players.each(function () {
      const stats = $(this).find('.squad-table-stat')
      const stat = {
        ovr: stats.eq(0).text(),
        pas: stats.eq(1).text(),
        sht: stats.eq(2).text(),
        str: stats.eq(3).text(),
        def: stats.eq(4).text(),
        spd: stats.eq(5).text(),
        dri: stats.eq(6).text()
      }
      const name = $(this).find('.namelink').text()
      const logo = $(this).find('.player_head').attr('src')
      const link = $(this).find('.namelink').attr('href')
      const country = $(this).find('.country-flag').attr('src')
      const age = $(this).find('.squad-table-age').text()
      const height = $(this).find('.squad-table-height').text()
      const position = $(this).find('.squad-table-pos').text()
      const code = link.split('/')[1]
      const id = link.split('/')[4]
      const player = {
        stats: stat,
        name,
        logo: base + logo,
        link: base + link,
        country: base + country,
        age,
        height,
        position,
        code,
        teamId: team._id,
        id
      }
      playersInTeam.push(player)
      allPlayers.push(player)
    })
    await repository.saveAllPlayers(playersInTeam)
    return Promise.resolve()
  }
  const limit = 5
  let promises = []
  for (let i = 0; i < teams.length; i++) {
    console.log(i && ((i / teams.length) * 100) + '%')
    const team = teams[i]
    promises.push(getPlayer(team))
    if (promises.length === limit || i === teams.length - 1) {
      await Promise.all(promises)
      promises = []
    }
  }
  res.json({ sussess: 'Done' })
}

exports.allPlayersInTeam = async (req, res) => {
  if (!req.query.teamId) {
    return res.status(403).json({ error: 'Must provide teamId query parameter' })
  }
  const players = await repository.getAllPlayersByTeamId(req.query.teamId)
  return res.status(200).json(players)
}
