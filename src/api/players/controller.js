const repository = require('./repository')
const teamsRepository = require('../teams/repository')
const cheerio = require('cheerio')
const fetchData = require('../../utils/fetchData')
const base = 'https://www.pesmaster.com'

exports.crawAllPlayers = async (req, res) => {
  const teams = await teamsRepository.getAllTeams()
  const allPlayers = []
  const getPlayer = (link, _id) => async () => {
    const teamPage = await fetchData(link)
    if (!(teamPage && teamPage.data)) {
      return Promise.resolve()
    }
    const $ = cheerio.load(teamPage.data)
    const players = $('#search-result-table').eq(0).find('tbody tr')
    const statsBlocks = $('.stat-donut-block')
    const stats = {
      attack: statsBlocks.eq(3).find('.stat').text(),
      defence: statsBlocks.eq(1).find('.stat').text(),
      midfield: statsBlocks.eq(2).find('.stat').text()
    }
    await teamsRepository.updateTeamById(_id, { stats })
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
      const logo = $(this).find('.player_head').attr('data-src')
      const link = $(this).find('.namelink').attr('href')
      const country = $(this).find('.country-flag').attr('data-src')
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
        teamId: _id,
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
    console.log(i && ((i / teams.length) * 100).toPrecision(2) + '%')
    const team = teams[i]
    promises.push(getPlayer(team.link, team._id))
    if (promises.length === limit || i === teams.length - 1) {
      await Promise.all(promises.map(promise => promise()))
      promises = []
    }
  }
  res.json({ sussess: true })
}

exports.crawAllDetailPlayers = async (req, res) => {
  const players = await repository.getAllPlayers()
  const getPlayer = (link, _id) => async () => {
    const playerPage = await fetchData(link)
    if (!(playerPage && playerPage.data)) {
      return Promise.resolve()
    }
    const $ = cheerio.load(playerPage.data)
    const statsBlocks = $('.stats-block')
    const updatePlayer = {}
    const detailStats = {}
    statsBlocks.each(function () {
      const ability = $(this).find('h4').clone().children().remove().end().text()
      const abilityTier = $(this).find('h4 span').attr('class').replace(' stat', '').split('stat_tier_')[1]
      const abilityPoint = $(this).find('h4 span').text()

      detailStats[ability] = {
        tier: abilityTier,
        point: abilityPoint,
        child: []
      }

      const rows = $(this).find('tr')
      rows.each(function () {
        const abilityChild = $(this).find('td').eq(1).text()
        const abilityTier = $(this).find('td').eq(0).attr('class').replace(' stat', '').split('stat_tier_')[1]
        const abilityPoint = $(this).find('td span').text()
        detailStats[ability].child.push({
          abilityName: abilityChild,
          tier: abilityTier,
          point: abilityPoint
        })
      })
    })
    updatePlayer.detailStats = detailStats
    updatePlayer.playingStyle = []
    $('.player-main-column').eq(1).find('li').each(function () { updatePlayer.playingStyle.push($(this).text()) })
    updatePlayer.playerSkills = []
    $('.player-main-column').eq(2).find('li').each(function () { updatePlayer.playerSkills.push($(this).text()) })
    updatePlayer.comPlayingStyles = []
    $('.player-main-column').eq(3).find('li').each(function () { updatePlayer.comPlayingStyles.push($(this).text()) })
    updatePlayer.positionStats = []
    $('.player-positions-row').each(function () {
      const row = []
      $(this).find('.player-positions-item').each(function (index, element) {
        row.push({
          position: $(element).find('span').eq(0).text(),
          point: $(element).find('span').eq(1).text(),
          tier: $(element).attr('class').replace('player-positions-item ', '')[3],
          main: $(element).attr('class').includes('main')
        })
      })
      updatePlayer.positionStats.push(row)
    })
    const additionInfo = ['Full Name', 'Nationality', 'Team', 'Stronger Foot', 'Weight']
    $('.player-info tr').each(function () {
      if (additionInfo.includes($(this).find('td').eq(0).text())) {
        updatePlayer[$(this).find('td').eq(0).text().trim()] = $(this).find('td').eq(1).text()
      }
    })
    try {
      await repository.updatePlayerById(_id, updatePlayer)
    } catch (err) {
      console.log(err)
    }
    return Promise.resolve()
  }
  const limit = 5
  let promises = []
  for (let i = 0; i < players.length; i++) {
    console.log(i && ((i / players.length) * 100).toPrecision(2) + '%')
    const player = players[i]
    console.log(player.link, player._id)
    promises.push(getPlayer(player.link, player._id))
    if (promises.length === limit || i === players.length - 1) {
      await Promise.all(promises.map(promise => promise()))
      promises = []
    }
  }
  res.json({ sussess: true })
}

exports.allPlayersInTeam = async (req, res) => {
  if (!req.query.teamId) {
    return res.status(403).json({ error: 'Must provide teamId query parameter' })
  }
  const players = await repository.getAllPlayersByTeamId(req.query.teamId)
  return res.status(200).json(players)
}
