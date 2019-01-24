
const hlAPI = require('heroeslounge-api')

hlAPI.getPlayoff(1).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getPlayoffs().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
