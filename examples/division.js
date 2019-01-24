
const hlAPI = require('heroeslounge-api')

hlAPI.getDivision().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getDivisions().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

