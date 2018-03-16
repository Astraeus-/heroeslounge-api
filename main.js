
const hlAPI = require('./index.js')

// hlAPI.getBanInfo(21).then((response) => {
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
// hlAPI.getMatchInfo(1).then((response) => {
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

// hlAPI.getTeams().then((response) => {
//   response.forEach(async (team) => {
//     if (team.slug === 'DOF') {
//       await hlAPI.getTeamInfo(team.id).then((response) => {
//         console.log('Team name: ' + response.team.title)
//         console.log('Creation date: ' + response.team.created_at)
//         console.log('Team descriptions: ' + response.team.short_description)
//         console.log('Team active: ' + response.team.disbanded)
//
//         console.log('Logo: ' + response.logo.path)
//
//         response.sloths.forEach((sloth) => {
//           console.log('Username: ' + sloth.title + ' Discord tag: ' + sloth.discord_tag)
//         })
//       }).catch((error) => {
//         console.error(error)
//       })
//       await hlAPI.getTeamMatches(team.id).then((response) => {
//         // console.log(response)
//         hlAPI.getDivisionInfo(response.matches[response.matches.length - 1]).then((response) => {
//           console.log(response)
//         }).catch((error) => {
//           console.error(error)
//         })
//       }).catch((error) => {
//         console.error(error)
//       })
//     }
//   })
// }).catch((error) => {
//   console.error(error)
// })

// Add specification how many results you'd want to get.
// Add a proper test script for all of the functions.
// Add some form of rate-limiting.
