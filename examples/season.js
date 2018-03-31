
const hlAPI = require('heroeslounge-api')

hlAPI.getSeasons().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getSeasonInfo(3).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
