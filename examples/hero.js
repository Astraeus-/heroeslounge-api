
const hlAPI = require('heroeslounge-api')

hlAPI.getHeroes().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getHeroInfo(1).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
