
const hlAPI = require('heroeslounge-api')

hlAPI.getDivisions().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getDivisionInfo().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
