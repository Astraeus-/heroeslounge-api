
const hlAPI = require('heroeslounge-api')

hlAPI.getGame(9).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getGames().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
