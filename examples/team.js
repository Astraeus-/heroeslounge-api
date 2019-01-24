
const hlAPI = require('heroeslounge-api')

hlAPI.getTeam(2).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getTeams().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getTeamMatches(2).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getTeamTimelineEntries(2).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
