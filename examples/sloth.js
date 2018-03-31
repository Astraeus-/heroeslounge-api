
const hlAPI = require('heroeslounge-api')

hlAPI.getSloths().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getSlothInfo(1).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
