
const hlAPI = require('./index.js')

hlAPI.getTeams().then((response) => {
  response.teams.forEach((team) => {
    console.log(team.id + ': ' + team.title)
  })
}).catch((error) => {
  console.log(error)
})
// Add specification how many results you'd want to get.
