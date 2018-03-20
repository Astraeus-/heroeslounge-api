
const hlAPI = require('./index.js')

// Start time of the data request.
let start = Date.now()

// hlAPI.getBanInfo(-1).then((response) => {
//   console.log(response)
// }).catch((error) => {
//   console.log(error)
// })
// hlAPI.getBans().then((response) => {
//   console.log(response)
// }).catch((error) => {
//   console.log(error)
// })
//
// hlAPI.getDivisions().then((response) => {
//   response.forEach((division) => {
//     console.log(division.season_id + ': ' + division.title)
//   })
// }).catch((error) => {
//   console.log(error)
// })
// hlAPI.getHeroes().then((response) => {
//   response.forEach((hero) => {
//     console.log(hero.id + ': ' + hero.title)
//   })
// }).catch((error) => {
//   console.log(error)
// })
//
// hlAPI.getMatches().then((response) => {
//   response.forEach((match) => {
//     console.log(match.id + ': ' + match.wbp)
//   })
// }).catch((error) => {
//   console.log(error)
// })
//
// hlAPI.getMatchInfo(1474).then((response) => {
//   console.log(response)
// }).catch((error) => {
//   console.log(error)
// })
// hlAPI.getMatchesToday().then((response) => {
//   response.forEach((match) => {
//     console.log(match.id + ': ' + match.teams[0].title + ' VS ' + match.teams[1].title)
//   })
// }).catch((error) => {
//   console.log(error)
// })
// hlAPI.getPlayoffs().then((response) => {
//   response.forEach((playoff) => {
//     console.log(playoff.id + ': Season: ' + playoff.season_id + ' ' + playoff.title)
//   })
// }).catch((error) => {
//   console.log(error)
// })
//
// hlAPI.getSeasons().then((response) => {
//   response.forEach((season) => {
//     console.log(season.id + ': ' + season.title)
//   })
// }).catch((error) => {
//   console.log(error)
// })
//
// hlAPI.getSloths().then((response) => {
//   response.forEach((sloth) => {
//     console.log(sloth.id + ': ' + sloth.title)
//   })
// }).catch((error) => {
//   console.log(error)
// })
//
// hlAPI.getTalents().then((response) => {
//   response.forEach((talent) => {
//     console.log(talent.id + ': ' + talent.title)
//   })
// }).catch((error) => {
//   console.log(error)
// })

// hlAPI.getTeams(50).then(async (teams) => {
//   console.log(Math.ceil(teams.length / 20) + ' pages of team data')
//   console.log(teams.length)
//   let allTeamData = []
//   let teamData = {}
//
//   for (let i = 0; i < teams.length - 1; i++) {
//     teamData[i] = hlAPI.getTeamInfo(teams[i].id).catch((error) => {
//       console.log(error)
//     })
//   }
//
//   await Promise.all(mapObjectToArray(teamData)).then((promiseArray) => {
//     for (let i = 0; i < promiseArray.length; i += 2) {
//       allTeamData = allTeamData.concat(promiseArray[i + 1])
//     }
//   })
//
//   // All the data is retrieved at this point.
//   console.log(Date.now() - start + ' ms to fetch all data')
//   allTeamData.forEach((team) => {
//     console.log('Team Name: ' + team.title)
//     console.log('Creation Date: ' + team.created_at)
//     let captain = team.sloths.find((sloth) => {
//       return sloth.is_captain === '1'
//     })
//     if (captain) console.log('Captain: ' + captain.title)
//     else console.log('Team disbanded')
//   })
// }).catch((error) => {
//   console.error(error)
// })

// hlAPI.getTeams().then((response) => {
//   console.log(Math.ceil(response.length / 20) + ' pages of team data')
//   console.log(response.length + ' number of teams')
//   console.log(Date.now() - start + ' ms to fetch all data')
//   // console.log(response)
// }).catch((error) => {
//   console.log(error)
// })
// Complete: 2, Missing sloths: 4, Missing logo: 161
// hlAPI.getTeamInfo(2).then((response) => {
//   console.log(response)
// }).catch((error) => {
//   console.log(error)
// })

// hlAPI.getSeasonInfo(3).then((response) => {
//   let teams = response.teams
//   let nCaptains = 0
//   let reqCount = 0
//
//   teams.forEach((team) => {
//     reqCount++
//     setTimeout(async () => {
//       if (team.disbanded === '0') {
//         await hlAPI.getTeamInfo(team.id).then((response) => {
//           let sloths = response.sloths
//           sloths.forEach((sloth) => {
//             if (sloth.is_captain === '1') {
//               nCaptains++
//               // if (sloth.discord_tag.length < 1) console.log(sloth)
//               console.log(sloth.discord_tag)
//             }
//           })
//           if (team.id === teams[teams.length - 1].id) {
//             console.log(nCaptains + ' Team captains of active teams')
//           }
//         }).catch((error) => {
//           console.log(error)
//         })
//       } else {
//         // console.log('INACTIVE TEAM: ' + team.title)
//       }
//     }, reqCount * 250)
//   })
// }).catch((error) => {
//   console.log(error)
// })

// Maps an object to an array for await Promise.all
let mapObjectToArray = (object) => {
  let objectArray = []
  Object.keys(object).forEach((key) => {
    objectArray.push(key, object[key])
  })
  return objectArray
}

// Try to combine _req and _reqMulti.
// Add a proper test script for all of the functions.
