
const hlAPI = require('heroeslounge-api')

hlAPI.getTalent(1).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getTalents().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
