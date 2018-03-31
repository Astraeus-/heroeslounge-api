
const hlAPI = require('heroeslounge-api')

hlAPI.getTeams().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getTeamInfo(1).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
