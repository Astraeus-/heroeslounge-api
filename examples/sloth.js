
const hlAPI = require('heroeslounge-api')

hlAPI.getSloth(1).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getSloths().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
