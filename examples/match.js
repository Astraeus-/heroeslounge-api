
const hlAPI = require('heroeslounge-api')

hlAPI.getMatch(16).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getMatches().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getMatchesToday().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
