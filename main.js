
const hlAPI = require('./index.js')

hlAPI.getSeasonInfo(2).then((response) => {
  // console.log(response)
})

hlAPI.getTeamMatches(2).then((response) => {
  // console.log(response)
})

hlAPI.getDivisions().then((response) => {
  console.log(response)
})
