const repository = require('./repository')
const leaguesRepository = require('../leagues/repository')
const cheerio = require('cheerio')
const fetchData = require('../../utils/fetchData')
const base = 'https://www.pesmaster.com'

exports.crawAllTeams = async (req, res) => {
  const leagues = await leaguesRepository.getAllLeagues()
  const getTeams = async (league) => {
    const teamPage = await fetchData(league.link)
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
    await repository.saveAllTeams(teams)
    return Promise.resolve()
  }
  const limit = 5
  let promises = []
  for (let i = 0; i < leagues.length; i++) {
    console.log(i && ((i / leagues.length) * 100) + '%')
    const league = leagues[i]
    promises.push(getTeams(league))
    if (promises.length === limit || i === leagues.length - 1) {
      await Promise.all(promises)
      promises = []
    }
  }
  res.json({ success: true })
}

exports.allTeamsInLeague = async (req, res) => {
  if (!req.query.leagueId) {
    return res.status(403).json({ error: 'Must provide leagueId query parameter' })
  }
  const teams = await repository.getAllteamsByLeagueId(req.query.leagueId)
  return res.status(200).json(teams)
}
