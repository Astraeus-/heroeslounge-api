// Heroes Lounge API.
const _HTTPS = require('https')

const VERSION = 'v1'
const baseURL = 'heroeslounge.gg'
const API = '/api/' + VERSION

// Heroes Lounge API Methods.
const hlAPI = {

  getBan: async (banID) => {
    if (!banID) throw Error('Ban ID is not defined')

    return _req('get', Endpoints.BANS(banID)).catch((error) => {
      throw Error(`Ban with ID ${banID} does not exist \n${error}`)
    })
  },

  getBans: async (limit) => {
    return _reqMulti('get', Endpoints.BANS(), limit).catch((error) => {
      throw error
    })
  },

  getDivision: async (divisionID) => {
    if (!divisionID) throw Error('Division ID is not defined')

    return _req('get', Endpoints.DIVISIONS(divisionID)).catch((error) => {
      throw Error(`Division with ID ${divisionID} does not exist \n${error}`)
    })
  },

  getDivisions: async (limit) => {
    return _reqMulti('get', Endpoints.DIVISIONS(), limit).catch((error) => {
      throw error
    })
  },

  getDivisionTeams: async (divisionID) => {
    if (!divisionID) throw Error('Division ID is not defined')

    return _req('get', Endpoints.DIVISION_TEAMS(divisionID)).catch((error) => {
      throw Error(`Teams for division with ID ${divisionID} do not exist \n${error}`)
    })
  },

  getGame: async (gameID) => {
    if (!gameID) throw Error('Game ID is not defined')

    return _req('get', Endpoints.GAMES(gameID)).catch((error) => {
      throw Error(`Game with ID ${gameID} does not exist \n${error}`)
    })
  },

  getGames: async (limit) => {
    return _reqMulti('get', Endpoints.GAMES(), limit).catch((error) => {
      throw error
    })
  },

  getHero: async (heroID) => {
    if (!heroID) throw Error('Hero ID is not defined')

    return _req('get', Endpoints.HEROES(heroID)).catch((error) => {
      throw Error(`Hero with ID ${heroID} does not exist \n${error}`)
    })
  },

  getHeroes: async (limit) => {
    return _reqMulti('get', Endpoints.HEROES(), limit).catch((error) => {
      throw error
    })
  },

  getMatch: async (matchID) => {
    if (!matchID) throw Error('Match ID is not defined')

    return _req('get', Endpoints.MATCHES(matchID)).catch((error) => {
      throw Error(`Match with ID ${matchID} does not exist \n${error}`)
    })
  },

  getMatches: async (limit) => {
    return _reqMulti('get', Endpoints.MATCHES(), limit).catch((error) => {
      throw error
    })
  },

  getMatchesToday: async () => {
    return _req('get', Endpoints.MATCHES_TODAY()).catch((error) => {
      throw Error(`Could not get today's matches \n${error}`)
    })
  },

  getMatchesWithApprovedCastBetween: async (startDate, endDate) => {
    if (!startDate || !endDate) throw Error('Date interval is not defined')
    if (!startDate.match(/\d{4}-\d{1,2}-\d{1,2}/g) ||
        !endDate.match(/\d{4}-\d{1,2}-\d{1,2}/g)) throw Error('Invalid date syntax, must be of type: YYYY-MM-DD')

    return _req('get', Endpoints.MATCHES_WITH_APPROVED_CAST_BETWEEN(startDate, endDate)).catch((error) => {
      throw Error(`Could not get matches with aprroved cast between ${startDate} - ${endDate}\n${error}`)
    })
  },

  getMatchCasters: async (matchID) => {
    if (!matchID) throw Error('Match ID is not defined')

    return _req('get', Endpoints.MATCH_CASTERS(matchID)).catch((error) => {
      throw Error(`Casters for match with ID ${matchID} do not exist \n${error}`)
    })
  },

  getMatchGames: async (matchID) => {
    if (!matchID) throw Error('Match ID is not defined')

    return _req('get', Endpoints.MATCH_GAMES(matchID)).catch((error) => {
      throw Error(`Games for match with ID ${matchID} do not exist \n${error}`)
    })
  },

  getMatchReplays: async (matchID) => {
    if (!matchID) throw Error('Match ID is not defined')

    return _req('get', Endpoints.MATCH_REPLAYS(matchID)).catch((error) => {
      throw Error(`Replays for match with ID ${matchID} do not exist \n${error}`)
    })
  },

  getMatchTeams: async (matchID) => {
    if (!matchID) throw Error('Match ID is not defined')

    return _req('get', Endpoints.MATCH_TEAMS(matchID)).catch((error) => {
      throw Error(`Teams for match with ID ${matchID} do not exist \n${error}`)
    })
  },

  getPlayoff: async (playoffID) => {
    if (!playoffID) throw Error('Playoff ID is not defined')

    return _req('get', Endpoints.PLAYOFFS(playoffID)).catch((error) => {
      throw Error(`Playoff with ID ${playoffID} does not exist \n${error}`)
    })
  },

  getPlayoffs: async (limit) => {
    return _reqMulti('get', Endpoints.PLAYOFFS(), limit).catch((error) => {
      throw error
    })
  },

  getPlayoffDivisions: async (playoffID) => {
    if (!playoffID) throw Error('Playoff ID is not defined')

    return _req('get', Endpoints.PLAYOFF_DIVISIONS(playoffID)).catch((error) => {
      throw Error(`Divisions for playoff with ID ${playoffID} do not exist \n${error}`)
    })
  },

  getPlayoffMatches: async (playoffID) => {
    if (!playoffID) throw Error('Playoff ID is not defined')

    return _req('get', Endpoints.PLAYOFF_MATCHES(playoffID)).catch((error) => {
      throw Error(`Matches for playoff with ID ${playoffID} do not exist \n${error}`)
    })
  },

  getSeasonCasterStatistics: async (seasonID) => {
    if (!seasonID) throw Error('Season ID is not defined')

    return _req('get', Endpoints.SEASON_CASTER_STATISTICS(seasonID)).catch((error) => {
      throw Error(`Season with ID ${seasonID} does not exist \n${error}`)
    })
  },

  getSeason: async (seasonID) => {
    if (!seasonID) throw Error('Season ID is not defined')

    return _req('get', Endpoints.SEASONS(seasonID)).catch((error) => {
      throw Error(`Season with ID ${seasonID} does not exist \n${error}`)
    })
  },

  getSeasons: async (limit) => {
    return _reqMulti('get', Endpoints.SEASONS(), limit).catch((error) => {
      throw error
    })
  },

  getSeasondivisions: async (seasonID) => {
    if (!seasonID) throw Error('Season ID is not defined')

    return _req('get', Endpoints.SEASON_DIVISIONS(seasonID)).catch((error) => {
      throw Error(`Divisions for season with ID ${seasonID} do not exist \n${error}`)
    })
  },

  getSeasonPlayoffs: async (seasonID) => {
    if (!seasonID) throw Error('Season ID is not defined')

    return _req('get', Endpoints.SEASON_PLAYOFFS(seasonID)).catch((error) => {
      throw Error(`Playoffs for season with ID ${seasonID} do not exist \n${error}`)
    })
  },

  getSeasonTeams: async (seasonID) => {
    if (!seasonID) throw Error('Season ID is not defined')

    return _req('get', Endpoints.SEASON_TEAMS(seasonID)).catch((error) => {
      throw Error(`Teams for season with ID ${seasonID} do not exist \n${error}`)
    })
  },

  getSloth: async (slothID) => {
    if (!slothID) throw Error('Sloth ID is not defined')

    return _req('get', Endpoints.SLOTHS(slothID)).catch((error) => {
      throw Error(`Sloth with ID ${slothID} does not exist \n${error}`)
    })
  },

  getSloths: async (limit) => {
    return _reqMulti('get', Endpoints.SLOTHS(), limit).catch((error) => {
      throw error
    })
  },

  getSlothByDiscordId: async (discordID) => {
    if (!discordID) throw Error('Discord ID is not defined')

    return _req('get', Endpoints.SLOTH_DISCORD_ID(discordID)).catch((error) => {
      throw Error(`Sloth with Discord ID ${discordID} does not exist \n${error}`)
    })
  },

  getTalent: async (talentID) => {
    if (!talentID) throw Error('Talent ID is not defined')

    return _req('get', Endpoints.TALENTS(talentID)).catch((error) => {
      throw Error(`Talent with ID ${talentID} does not exist \n${error}`)
    })
  },

  getTalents: async (limit) => {
    return _reqMulti('get', Endpoints.TALENTS(), limit).catch((error) => {
      throw error
    })
  },

  getTeam: async (teamID) => {
    if (!teamID) throw Error('Team ID is not defined')

    return _req('get', Endpoints.TEAMS(teamID)).catch((error) => {
      throw Error(`Team with ID ${teamID} does not exist \n${error}`)
    })
  },

  getTeams: async (limit) => {
    return _reqMulti('get', Endpoints.TEAMS(), limit).catch((error) => {
      throw error
    })
  },

  getTeamLogo: async (teamID) => {
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

  getTeamMatches: async (teamID) => {
    if (!teamID) throw Error('Team ID is not defined')

    return _req('get', Endpoints.TEAM_MATCHES(teamID)).catch((error) => {
      throw Error(`Matches for team with ID ${teamID} do not exist \n${error}`)
    })
  },

  getTeamSloths: async (teamID) => {
    if (!teamID) throw Error('Team ID is not defined')

    return _req('get', Endpoints.TEAM_SLOTHS(teamID)).catch((error) => {
      throw Error(`Sloths for team with ID ${teamID} do not exist \n${error}`)
    })
  },

  getTeamTimelineEntries: async (teamID) => {
    if (!teamID) throw Error('Team ID is not defined')

    return _req('get', Endpoints.TEAM_TIMELINE(teamID)).catch((error) => {
      throw Error(`Timeline for team with ID ${teamID} does not exist \n${error}`)
    })
  },

  getTwitchChannel: async (channelID) => {
    if (!channelID) throw Error('Channel ID is not defined')

    return _req('get', Endpoints.TWITCH_CHANNELS(channelID)).catch((error) => {
      throw Error(`Twitch channel with ID ${channelID} does not exist \n${error}`)
    })
  },

  getTwitchChannels: async (limit) => {
    return _reqMulti('get', Endpoints.TWITCH_CHANNELS(), limit).catch((error) => {
      throw error
    })
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
  let returnData = []
  let pageData = []
  let pageDataSize
  let currentPage

  let nPagesToRequest

  // Initial request.
  await _req(type, endpoint).then((response) => {
    pageData.push(response)
    pageDataSize = response.per_page
    currentPage = response.current_page
    nPagesToRequest = limit ? Math.min(Math.max(Math.ceil(limit / pageDataSize), 1), response.last_page) : response.last_page
  }).catch((error) => {
    throw error
  })

  // Subsequent requests for additional data if required.
  for (let i = currentPage + 1; i <= nPagesToRequest; i++) {
    pageData.push(_req('get', endpoint + '?page=' + i))
  }

  await Promise.all(pageData).then((values) => {
    values.forEach((value) => {
      returnData = returnData.concat(value.data)
    })
  }).catch((error) => {
    throw error
  })

  if (returnData.length > limit) returnData = returnData.slice(0, limit)

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
          reject(Error(`Status Code ${res.statusCode} : Value does not exist`))
        } else {
          reject(Error(`status Code ${res.statusCode} : Invalid request`))
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
  MATCHES_WITH_APPROVED_CAST_BETWEEN: (startDate, endDate) => {
    return `${API}/matches/withApprovedCastBetween/${startDate}/${endDate}`
  },
  MATCHES_ALL: () => {
    return `${Endpoints.MATCHES()}All`
  },
  MATCHES_TODAY: () => {
    return `${Endpoints.MATCHES()}/today`
  },
  MATCH_TEAMS: (matchID) => {
    return `${Endpoints.MATCHES(matchID)}/teams`
  },
  MATCH_CASTERS: (matchID) => {
    return `${Endpoints.MATCHES(matchID)}/caster`
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
