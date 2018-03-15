
const hlAPI = require('./index.js')

// hlAPI.getTeams().then((response) => {
//   response.teams.forEach((team) => {
//     console.log(team.id + ': ' + team.title)
//   })
// }).catch((error) => {
//   console.log(error)
// })

// hlAPI.getTalents().then((response) => {
//   response.talents.forEach((talent) => {
//     console.log(talent.id + ': ' + talent.title)
//   })
// })

// hlAPI.getHeroes().then((response) => {
//   response.heroes.forEach((hero) => {
//     console.log(hero.id + ': ' + hero.title)
//   })
// })

// hlAPI.getMatches().then((response) => {
//   response.matches.forEach((match) => {
//     console.log(match.id + ': ' + match.wbp)
//   })
// })

hlAPI.getSloths().then((response) => {
  response.sloths.forEach((sloth) => {
    console.log(sloth.id + ': ' + sloth.title)
  })
})

// Add specification how many results you'd want to get.
// Add a proper test script for all of the functions.
// May need to add the fetch all for playoffs and sesaons at some point.
