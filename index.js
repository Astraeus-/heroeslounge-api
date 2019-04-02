// Heroes Lounge API.
const _HTTPS = require('https')

const VERSION = 'v1'
const baseURL = 'heroeslounge.gg'
const API = '/api/' + VERSION

// Heroes Lounge API Methods.
const hlAPI = {
  getBan: (banID) => {
    if (!banID) throw Error('Ban ID is not defined')

    return _req('get', Endpoints.BANS(banID))
  },

  getBans: (limit) => {
    return _reqMulti('get', Endpoints.BANS(), limit)
  },

  getDivision: (divisionID) => {
    if (!divisionID) throw Error('Division ID is not defined')

    return _req('get', Endpoints.DIVISIONS(divisionID))
  },

  getDivisions: (limit) => {
    return _reqMulti('get', Endpoints.DIVISIONS(), limit)
  },

  getDivisionTeams: (divisionID) => {
    if (!divisionID) throw Error('Division ID is not defined')

    return _req('get', Endpoints.DIVISION_TEAMS(divisionID))
  },

  getGame: (gameID) => {
    if (!gameID) throw Error('Game ID is not defined')

    return _req('get', Endpoints.GAMES(gameID))
  },

  getGames: (limit) => {
    return _reqMulti('get', Endpoints.GAMES(), limit)
  },

  getHero: (heroID) => {
    if (!heroID) throw Error('Hero ID is not defined')

    return _req('get', Endpoints.HEROES(heroID))
  },

  getHeroes: (limit) => {
    return _reqMulti('get', Endpoints.HEROES(), limit)
  },

  getMatch: (matchID) => {
    if (!matchID) throw Error('Match ID is not defined')

    return _req('get', Endpoints.MATCHES(matchID))
  },

  getMatches: (limit) => {
    return _reqMulti('get', Endpoints.MATCHES(), limit)
  },

  getMatchesToday: (tz1, tz2) => {
    return _req('get', Endpoints.MATCHES_TODAY(tz1, tz2))
  },

  getMatchesForDate: (date, tz1, tz2) => {
    if (!date) throw Error('Date is not defined')
    if (!date.match(/\d{4}-\d{1,2}-\d{1,2}/g)) throw Error('Invalid date syntax, must be of type: YYYY-MM-DD')

    return _req('get', Endpoints.MATCHES_FOR_DATE(date, tz1, tz2))
  },

  getMatchesWithApprovedCastBetween: (startDate, endDate) => {
    if (!startDate || !endDate) throw Error('Date interval is not defined')
    if (!startDate.match(/\d{4}-\d{1,2}-\d{1,2}/g) ||
        !endDate.match(/\d{4}-\d{1,2}-\d{1,2}/g)) throw Error('Invalid date syntax, must be of type: YYYY-MM-DD')

    return _req('get', Endpoints.MATCHES_WITH_APPROVED_CAST_BETWEEN(startDate, endDate))
  },

  getMatchChannels: (matchID) => {
    if (!matchID) throw Error('Match ID is not defined')

    return _req('get', Endpoints.MATCH_CHANNELS(matchID))
  },

  getMatchCasters: (matchID) => {
    if (!matchID) throw Error('Match ID is not defined')

    return _req('get', Endpoints.MATCH_CASTERS(matchID))
  },

  getMatchGames: (matchID) => {
    if (!matchID) throw Error('Match ID is not defined')

    return _req('get', Endpoints.MATCH_GAMES(matchID))
  },

  getMatchReplays: (matchID) => {
    if (!matchID) throw Error('Match ID is not defined')

    return _req('get', Endpoints.MATCH_REPLAYS(matchID))
  },

  getMatchTeams: (matchID) => {
    if (!matchID) throw Error('Match ID is not defined')

    return _req('get', Endpoints.MATCH_TEAMS(matchID))
  },

  getPlayoff: (playoffID) => {
    if (!playoffID) throw Error('Playoff ID is not defined')

    return _req('get', Endpoints.PLAYOFFS(playoffID))
  },

  getPlayoffs: (limit) => {
    return _reqMulti('get', Endpoints.PLAYOFFS(), limit)
  },

  getPlayoffDivisions: (playoffID) => {
    if (!playoffID) throw Error('Playoff ID is not defined')

    return _req('get', Endpoints.PLAYOFF_DIVISIONS(playoffID))
  },

  getPlayoffMatches: (playoffID) => {
    if (!playoffID) throw Error('Playoff ID is not defined')

    return _req('get', Endpoints.PLAYOFF_MATCHES(playoffID))
  },

  getSeasonCasterStatistics: (seasonID) => {
    if (!seasonID) throw Error('Season ID is not defined')

    return _req('get', Endpoints.SEASON_CASTER_STATISTICS(seasonID))
  },

  getSeason: (seasonID) => {
    if (!seasonID) throw Error('Season ID is not defined')

    return _req('get', Endpoints.SEASONS(seasonID))
  },

  getSeasons: (limit) => {
    return _reqMulti('get', Endpoints.SEASONS(), limit)
  },

  getSeasondivisions: (seasonID) => {
    if (!seasonID) throw Error('Season ID is not defined')

    return _req('get', Endpoints.SEASON_DIVISIONS(seasonID))
  },

  getSeasonPlayoffs: (seasonID) => {
    if (!seasonID) throw Error('Season ID is not defined')

    return _req('get', Endpoints.SEASON_PLAYOFFS(seasonID))
  },

  getSeasonTeams: (seasonID) => {
    if (!seasonID) throw Error('Season ID is not defined')

    return _req('get', Endpoints.SEASON_TEAMS(seasonID))
  },

  getSloth: (slothID) => {
    if (!slothID) throw Error('Sloth ID is not defined')

    return _req('get', Endpoints.SLOTHS(slothID))
  },

  getSloths: (limit) => {
    return _reqMulti('get', Endpoints.SLOTHS(), limit)
  },

  getSlothByDiscordId: (discordID) => {
    if (!discordID) throw Error('Discord ID is not defined')

    return _req('get', Endpoints.SLOTH_DISCORD_ID(discordID))
  },

  getTalent: (talentID) => {
    if (!talentID) throw Error('Talent ID is not defined')

    return _req('get', Endpoints.TALENTS(talentID))
  },

  getTalents: (limit) => {
    return _reqMulti('get', Endpoints.TALENTS(), limit)
  },

  getTeam: (teamID) => {
    if (!teamID) throw Error('Team ID is not defined')

    return _req('get', Endpoints.TEAMS(teamID))
  },

  getTeams: (limit) => {
    return _reqMulti('get', Endpoints.TEAMS(), limit)
  },

  getTeamLogo: (teamID) => {
    if (!teamID) throw Error('Team ID is not defined')

    return _req('get', Endpoints.TEAM_LOGO(teamID)).catch((error) => {
      if (error.message === 'Parse JSON response') {
        // console.log(`Team with ID ${teamID} does not have a custom logo`)
        return {}
      } else {
        throw Error(`Logo for team with ID ${teamID} does not exist \n${error}`)
      }
    })
  },

  getTeamMatches: (teamID) => {
    if (!teamID) throw Error('Team ID is not defined')

    return _req('get', Endpoints.TEAM_MATCHES(teamID))
  },

  getTeamSloths: (teamID) => {
    if (!teamID) throw Error('Team ID is not defined')

    return _req('get', Endpoints.TEAM_SLOTHS(teamID))
  },

  getTeamTimelineEntries: (teamID) => {
    if (!teamID) throw Error('Team ID is not defined')

    return _req('get', Endpoints.TEAM_TIMELINE(teamID))
  },

  getTwitchChannel: (channelID) => {
    if (!channelID) throw Error('Channel ID is not defined')

    return _req('get', Endpoints.TWITCH_CHANNELS(channelID))
  },

  getTwitchChannels: (limit) => {
    return _reqMulti('get', Endpoints.TWITCH_CHANNELS(), limit)
  }
}

/*

Rate-Limit tracking

*/

let rateLimitInterval = 100
let lastRequestTime = Date.now() - rateLimitInterval // Initialize to allow instant request at start up.
let requestQueue = []

let _reqMulti = async (type, endpoint, limit) => {
  if (typeof limit !== 'undefined' && typeof limit !== 'number') throw TypeError('limit is not of type number')
  if (limit === 0) return []

  let returnData = []
  let pageData = []
  let pageDataSize
  let currentPage

  let nPagesToRequest

  // Initial request.
  const initialRequest = await _req(type, endpoint).catch((error) => {
    throw error
  })

  pageDataSize = initialRequest.per_page
  currentPage = initialRequest.current_page
  nPagesToRequest = limit ? Math.min(Math.max(Math.ceil(Math.abs(limit) / pageDataSize), 1), initialRequest.last_page) : initialRequest.last_page

  if (typeof limit === 'undefined' || limit >= 0) {
    pageData.push(initialRequest)
    for (let i = currentPage + 1; i <= nPagesToRequest; i++) {
      pageData.push(_req('get', endpoint + '?page=' + i))
    }
  } else if (limit < 0) {
    for (let i = initialRequest.last_page; i > initialRequest.last_page - nPagesToRequest; i--) {
      pageData.push(_req('get', endpoint + '?page=' + i))
    }
  }

  await Promise.all(pageData).then((values) => {
    values.forEach((value) => {
      returnData = returnData.concat(value.data)
    })
  }).catch((error) => {
    throw error
  })

  if (returnData.length > Math.abs(limit)) {
    returnData = limit >= 0 ? returnData.slice(0, limit) : returnData.slice(limit, returnData.length)
  }

  return returnData
}

let _req = (type, endpoint) => {
  let timeSinceLastRequest = Date.now() - lastRequestTime
  lastRequestTime = Date.now()

  return new Promise((resolve, reject) => {
    const options = {
      hostname: baseURL,
      path: endpoint,
      method: type,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (timeSinceLastRequest >= rateLimitInterval) {
      makeRequest(options).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    } else {
      requestQueue.push({ 'type': type, 'endpoint': endpoint })
      let nextRequest = requestQueue.length === 0 ? rateLimitInterval - timeSinceLastRequest : (requestQueue.length - 1) * rateLimitInterval + rateLimitInterval
      setTimeout(() => {
        deleteRequestQueueElement(options.method, options.path)
        makeRequest(options).then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      }, nextRequest)
    }
  })
}

let makeRequest = (options) => {
  return new Promise((resolve, reject) => {
    const req = _HTTPS.request(options, (res) => {
      let rawResponse = ''
      res.setEncoding('utf8')

      res.on('data', (d) => {
        rawResponse += d
      })

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            let response = JSON.parse(rawResponse)
            resolve(response)
          } catch (err) {
            reject(Error('Parse JSON response'))
          }
        } else if (res.statusCode === 400) {
          reject(Error(`Status Code ${res.statusCode}: Value for ${options.path} does not exist`))
        } else {
          reject(Error(`status Code ${res.statusCode}: Invalid request for ${options.path}`))
        }
      })
    })

    req.on('error', (error) => {
      reject(error)
    })

    req.end()
  })
}

let deleteRequestQueueElement = (type, endpoint) => {
  let arrayIndex = requestQueue.findIndex((request) => {
    return request.type === type && request.endpoint === endpoint
  })
  requestQueue.splice(arrayIndex, 1)
}

/* Heroes Lounge Endpoints. */
const Endpoints = {

  BANS: (banID) => {
    return `${API}/bans${banID ? `/${banID}` : ''}`
  },
  BANS_ALL: () => {
    return `${Endpoints.BANS()}All`
  },

  DIVISIONS: (divisionID) => {
    return `${API}/divisions${divisionID ? `/${divisionID}` : ''}`
  },
  DIVISIONS_ALL: () => {
    return `${Endpoints.DIVISIONS()}All`
  },
  DIVISION_TEAMS: (divisionID) => {
    return `${Endpoints.DIVISIONS(divisionID)}/teams`
  },

  GAMES: (gameID) => {
    return `${API}/games${gameID ? `/${gameID}` : ''}`
  },
  GAMES_ALL: () => {
    return `${Endpoints.GAMES()}All`
  },
  GAMES_ALL_WITH_PLAYERS: () => {
    return `${Endpoints.GAMES_ALL()}WithPlayers`
  },

  HEROES: (heroID) => {
    return `${API}/heroes${heroID ? `/${heroID}` : ''}`
  },
  HEROES_ALL: () => {
    return `${Endpoints.HEROES()}All`
  },

  MATCHES: (matchID) => {
    return `${API}/matches${matchID ? `/${matchID}` : ''}`
  },
  MATCHES_FOR_DATE: (date, tz1, tz2) => {
    return `${API}/matches/forDate/${date}${tz1 ? `/${tz1}${tz2 ? `/${tz2}` : ''}` : ''}`
  },
  MATCHES_WITH_APPROVED_CAST_BETWEEN: (startDate, endDate) => {
    return `${API}/matches/withApprovedCastBetween/${startDate}/${endDate}`
  },
  MATCHES_ALL: () => {
    return `${Endpoints.MATCHES()}All`
  },
  MATCHES_TODAY: (tz1, tz2) => {
    return `${Endpoints.MATCHES()}/today${tz1 ? `/${tz1}${tz2 ? `/${tz2}` : ''}` : ''}`
  },
  MATCH_TEAMS: (matchID) => {
    return `${Endpoints.MATCHES(matchID)}/teams`
  },
  MATCH_CASTERS: (matchID) => {
    return `${Endpoints.MATCHES(matchID)}/caster`
  },
  MATCH_CHANNELS: (matchID) => {
    return `${Endpoints.MATCHES(matchID)}/channels`
  },
  MATCH_GAMES: (matchID) => {
    return `${Endpoints.MATCHES(matchID)}/games`
  },
  MATCH_REPLAYS: (matchID) => {
    return `${Endpoints.MATCHES(matchID)}/replays`
  },

  PLAYOFFS: (playoffID) => {
    return `${API}/playoffs${playoffID ? `/${playoffID}` : ''}`
  },
  PLAYOFFS_ALL: () => {
    return `${Endpoints.PLAYOFFS()}All`
  },
  PLAYOFF_DIVISIONS: (playoffID) => {
    return `${Endpoints.PLAYOFFS(playoffID)}/divisions`
  },
  PLAYOFF_MATCHES: (playoffID) => {
    return `${Endpoints.PLAYOFFS(playoffID)}/matches`
  },

  SEASONS: (seasonID) => {
    return `${API}/seasons${seasonID ? `/${seasonID}` : ''}`
  },
  SEASON_ALL: () => {
    return `${Endpoints.SEASONS()}All`
  },
  SEASON_CASTER_STATISTICS: (seasonID) => {
    return `${Endpoints.SEASONS(seasonID)}/casterstatistics`
  },
  SEASON_DIVISIONS: (seasonID) => {
    return `${Endpoints.SEASONS(seasonID)}/divisions`
  },
  SEASON_PLAYOFFS: (seasonID) => {
    return `${Endpoints.SEASONS(seasonID)}/playoffs`
  },
  SEASON_TEAMS: (seasonID) => {
    return `${Endpoints.SEASONS(seasonID)}/teams`
  },

  SLOTH_DISCORD_ID: (discordID) => {
    return `${API}/slothDiscordId/${discordID}`
  },
  SLOTHS: (slothID) => {
    return `${API}/sloths${slothID ? `/${slothID}` : ''}`
  },
  SLOTHS_ALL: () => {
    return `${Endpoints.SLOTHS()}All`
  },

  TALENTS: (talentID) => {
    return `${API}/talents${talentID ? `/${talentID}` : ''}`
  },
  TALENTS_ALL: () => {
    return `${Endpoints.TALENTS()}All`
  },

  TEAMS: (teamID) => {
    return `${API}/teams${teamID ? `/${teamID}` : ''}`
  },
  TEAMS_ALL: () => {
    return `${Endpoints.TEAMS()}All`
  },
  TEAM_SLOTHS: (teamID) => {
    return `${Endpoints.TEAMS(teamID)}/sloths`
  },
  TEAM_LOGO: (teamID) => {
    return `${Endpoints.TEAMS(teamID)}/logo`
  },
  TEAM_MATCHES: (teamID) => {
    return `${Endpoints.TEAMS(teamID)}/matches`
  },
  TEAM_TIMELINE: (teamID) => {
    return `${Endpoints.TEAMS(teamID)}/timelines`
  },

  TIMELINE_ENTRIES: (entryID) => {
    return `${API}/timeline${entryID ? `/${entryID}` : ''}`
  },

  TWITCH_CHANNELS: (channelID) => {
    return `${API}/channel${channelID ? `/${channelID}` : ''}`
  }

}

module.exports = hlAPI
