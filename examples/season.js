
const hlAPI = require('heroeslounge-api')

hlAPI.getSeason(3).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getSeasons().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getSeasonCasterStatistics(3).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
