
const hlAPI = require('heroeslounge-api')

hlAPI.getTalents().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getTalentInfo(1).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
