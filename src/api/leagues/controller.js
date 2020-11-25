const repository = require('./repository')
const cheerio = require('cheerio')
const fetchData = require('../../utils/fetchData')
const base = 'https://www.pesmaster.com'

exports.crawAllLeagues = async (req, res) => {
  const crawUrl = 'https://www.pesmaster.com/pes-2021/#leagues'
  const leagues = []
  fetchData(crawUrl).then((res) => {
    const html = res.data
    const $ = cheerio.load(html)
    const statsTable = $('#leagues + .team-block-container .team-block')
    statsTable.each(function () {
      const title = $(this).find('.team-block-name').text()
      const logo = $(this).find('.team-block-logo').attr('data-src')
      const link = $(this).find('a').attr('href')
      const code = link.split('/')[1]
      const league = {
        title,
        logo: base + logo,
        link: base + link,
        code
      }
      leagues.push(league)
    })

    return repository.saveAllLeagues(leagues)
  }).then(() => res.status(200).json({ leagues: leagues }))
}

exports.allLeagues = async (req, res) => {
  const leagues = await repository.getAllLeagues()
  return res.status(200).json(leagues)
}
