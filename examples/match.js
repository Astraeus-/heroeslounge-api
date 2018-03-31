
const hlAPI = require('heroeslounge-api')

hlAPI.getMatches().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getMatchInfo(16).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
hlAPI.getMatchesToday().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
