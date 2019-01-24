
const hlAPI = require('heroeslounge-api')

hlAPI.getHero(1).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getHeroes().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
