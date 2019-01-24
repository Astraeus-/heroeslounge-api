
const hlAPI = require('heroeslounge-api')

hlAPI.getBan(27).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getBans().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
