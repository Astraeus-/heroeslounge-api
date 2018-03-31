
const hlAPI = require('heroeslounge-api')

hlAPI.getGames().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getGameInfo(9).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
