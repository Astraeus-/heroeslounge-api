
const hlAPI = require('./index.js')

hlAPI.getBans().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getHeroes().then((response) => {
  response.forEach((hero) => {
    console.log(hero.id + ': ' + hero.title)
  })
}).catch((error) => {
  console.log(error)
})

hlAPI.getMatches().then((response) => {
  response.forEach((match) => {
    console.log(match.id + ': ' + match.wbp)
  })
}).catch((error) => {
  console.log(error)
})

hlAPI.getPlayoffs().then((response) => {
  response.forEach((playoff) => {
    console.log(playoff.id + ': Season: ' + playoff.season_id + ' ' + playoff.title)
  })
}).catch((error) => {
  console.log(error)
})

hlAPI.getSeasons().then((response) => {
  response.forEach((season) => {
    console.log(season.id + ': ' + season.title)
  })
}).catch((error) => {
  console.log(error)
})

hlAPI.getSloths().then((response) => {
  response.forEach((sloth) => {
    console.log(sloth.id + ': ' + sloth.title)
  })
}).catch((error) => {
  console.log(error)
})

hlAPI.getTalents().then((response) => {
  response.forEach((talent) => {
    console.log(talent.id + ': ' + talent.title)
  })
}).catch((error) => {
  console.log(error)
})

hlAPI.getTeams().then((response) => {
  response.forEach((team) => {
    console.log(team.id + ': ' + team.title)
  })
}).catch((error) => {
  console.log(error)
})

// Add specification how many results you'd want to get.
// Add a proper test script for all of the functions.
// Rework the bans endpoint.
