const repository = require('./repository')
const leaguesRepository = require('../leagues/repository')
const cheerio = require('cheerio')
const fetchData = require('../../utils/fetchData')
const base = 'https://www.pesmaster.com'

exports.crawAllTeams = async (req, res) => {
  const leagues = await leaguesRepository.getAllLeagues()
  const promises = []
  leagues.forEach(league => {
    promises.push(
      fetchData(league.link).then(teamPage => {
        const $ = cheerio.load(teamPage.data)
        const statsTeam = $('.team-block')
        const teams = []
        statsTeam.each(function () {
          const stat = $(this).find('.stat').text()
          const name = $(this).find('.team-block-name').text()
          const logo = $(this).find('.team-block-logo').attr('src')
          const link = $(this).find('a').attr('href')
          const code = link.split('/')[1]
          const team = {
            stat,
            name,
            logo: base + logo,
            link: base + link,
            code,
            leagueId: league._id
          }
          teams.push(team)
        })
        return teams
      })
    )
  })
  const response = await Promise.all(promises)
  const teams = []
  response.forEach(teamsPerLeague => {
    teamsPerLeague.forEach(team => {
      teams.push(team)
    })
  })
  await repository.saveAllTeams(teams)
  res.json(teams)
}

exports.allTeamsInLeague = async (req, res) => {
  if (!req.query.leagueId) {
    return res.status(403).json({ error: 'Must provide leagueId query parameter' })
  }
  const teams = await repository.getAllteamsByLeagueId(req.query.leagueId)
  return res.status(200).json(teams)
}
