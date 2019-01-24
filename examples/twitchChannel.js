
const hlAPI = require('heroeslounge-api')

hlAPI.getTwitchChannel(1).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})

hlAPI.getTwitchChannels().then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
