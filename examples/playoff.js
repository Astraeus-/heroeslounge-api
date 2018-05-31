
const hlAPI = require('heroeslounge-api')

hlAPI.getPlayoffs().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getPlayoffInfo(1).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
