// Heroes Lounge API.
const _HTTPS = require('https')

const VERSION = 'v1'
const baseURL = 'heroeslounge.gg'
const API = '/api/' + VERSION

// Heroes Lounge API Methods.
const hlAPI = {

  getBans: async (numberToRequest) => {
    let info = {}
    info['bans'] = await _reqMulti('get', Endpoints.BANS(), numberToRequest).catch((error) => {
      throw error
    })

    for (let ban in info['bans']) {
      info['bans'][ban]['hero'] = info['bans'][ban].hero_id ? _req('get', Endpoints.HEROES(info['bans'][ban].hero_id)).catch((error) => {
        throw Error(`Hero with ID ${info['bans'][ban].hero_id} does not exist \n${error}`)
      }) : null
      info['bans'][ban]['talent'] = info['bans'][ban].talent_id ? _req('get', Endpoints.TALENTS(info['bans'][ban].talent_id)).catch((error) => {
        throw Error(`Talent with ID ${info['bans'][ban].talent_id} does not exist \n${error}`)
      }) : null

      await Promise.all(mapObjectToArray(info['bans'][ban])).then((promiseArray) => {
        for (let i = 0; i < promiseArray.length; i += 2) {
          info['bans'][ban][promiseArray[i]] = promiseArray[i + 1]
        }
      }).catch((error) => {
        throw error
      })

      // Remove no longer needed information.
      delete info['bans'][ban].hero_id
      delete info['bans'][ban].talent_id
    }

    return info['bans']
  },

  getBanInfo: async (banID) => {
    if (!banID) throw Error('Ban ID is not defined')
    let info = {}
    info['ban'] = await _req('get', Endpoints.BANS(banID)).catch((error) => {
      throw Error(`Ban with ID ${banID} does not exist \n${error}`)
    })

    info['hero'] = info['ban'].hero_id ? _req('get', Endpoints.HEROES(info['ban'].hero_id)).catch((error) => {
      throw Error(`Hero with ID ${info['ban'].hero_id} does not exist \n${error}`)
    }) : null
    info['talent'] = info['ban'].talent_id ? _req('get', Endpoints.TALENTS(info['ban'].talent_id)).catch((error) => {
      throw Error(`Talent with ID + ${info['ban'].talent_id} does not exist \n${error}`)
    }) : null

    await Promise.all(mapObjectToArray(info)).then((promiseArray) => {
      for (let i = 0; i < promiseArray.length; i += 2) {
        if (typeof promiseArray[i + 1] === 'object') {
          if (promiseArray[i] === 'ban') continue
          info['ban'][promiseArray[i]] = promiseArray[i + 1]
          delete info[promiseArray[i]]
        }
        info[promiseArray[i]] = promiseArray[i + 1]
      }
    }).catch((error) => {
      throw error
    })

    return info['ban']
  },

  getDivisions: async (numberToRequest) => {
    let info = {}
    info['divisions'] = _reqMulti('get', Endpoints.DIVISIONS(), numberToRequest).catch((error) => {
      throw error
    })

    return info['divisions']
  },

  getDivisionInfo: async (divisionID) => {
    if (!divisionID) throw Error('Division ID is not defined')
    let info = {}
    info['division'] = _req('get', Endpoints.DIVISIONS(divisionID)).catch((error) => {
      throw Error(`Division with ID ${divisionID} does not exist \n${error}`)
    })
    info['teams'] = _req('get', Endpoints.DIVISION_TEAMS(divisionID)).catch((error) => {
      throw Error(`Team for division with ID ${divisionID} do not exist \n${error}`)
    })

    await Promise.all(mapObjectToArray(info)).then((promiseArray) => {
      for (let i = 0; i < promiseArray.length; i += 2) {
        info[promiseArray[i]] = promiseArray[i + 1]
      }
    }).catch((error) => {
      throw error
    })

    return info
  },

  getGames: async (numberToRequest) => {
    let info = {}
    info['games'] = _reqMulti('get', Endpoints.GAMES(), numberToRequest).catch((error) => {
      throw error
    })

    return info['games']
  },

  getGameInfo: async (gameID) => {
    if (!gameID) throw Error('Game ID is not defined')
    let info = {}
    info['game'] = _req('get', Endpoints.GAMES(gameID)).catch((error) => {
      throw Error(`Game with ID ${gameID} does not exist \n${error}`)
    })

    await Promise.all(mapObjectToArray(info)).then((promiseArray) => {
      for (let i = 0; i < promiseArray.length; i += 2) {
        info[promiseArray[i]] = promiseArray[i + 1]
      }
    }).catch((error) => {
      throw error
    })

    return info['game']
  },

  getHeroes: async (numberToRequest) => {
    let info = {}
    info['heroes'] = _reqMulti('get', Endpoints.HEROES(), numberToRequest).catch((error) => {
      throw error
    })

    return info['heroes']
  },

  getHeroInfo: async (heroID) => {
    if (!heroID) throw Error('Hero ID is not defined')
    let info = {}
    info['hero'] = _req('get', Endpoints.HEROES(heroID)).catch((error) => {
      throw Error(`Hero with ID ${heroID} does not exist \n${error}`)
    })

    await Promise.all(mapObjectToArray(info)).then((promiseArray) => {
      for (let i = 0; i < promiseArray.length; i += 2) {
        info[promiseArray[i]] = promiseArray[i + 1]
      }
    }).catch((error) => {
      throw error
    })

    return info['hero']
  },

  getMatches: async (numberToRequest) => {
    let info = {}
    info['matches'] = _reqMulti('get', Endpoints.MATCHES(), numberToRequest).catch((error) => {
      throw error
    })

    return info['matches']
  },

  getMatchesToday: async () => {
    let info = {}
    info['matches'] = await _req('get', Endpoints.MATCHES_TODAY()).catch((error) => {
      throw Error(`Could not get today's matches \n${error}`)
    })

    for (let match in info['matches']) {
      info['matches'][match]['teams'] = info['matches'][match].id ? _req('get', Endpoints.MATCH_TEAMS(info['matches'][match].id)).catch((error) => {
        throw Error(`Teams for match with ID ${info['matches'][match].id} do not exist \n${error}`)
      }) : null
      info['matches'][match]['twitch'] = info['matches'][match].channel_id ? _req('get', Endpoints.TWITCH_CHANNELS(info['matches'][match].channel_id)).catch((error) => {
        throw Error(`Twitch channel for match with ID ${info['matches'][match].id} does not exist \n${error}`)
      }) : null
      info['matches'][match]['casters'] = info['matches'][match].channel_id ? _req('get', Endpoints.MATCH_CASTERS(info['matches'][match].id)).catch((error) => {
        throw Error(`Casters for match with ID ${info['matches'][match].id} do not exist \n${error}`)
      }) : null

      await Promise.all(mapObjectToArray(info['matches'][match])).then((promiseArray) => {
        for (let i = 0; i < promiseArray.length; i += 2) {
          info['matches'][match][promiseArray[i]] = promiseArray[i + 1]
        }
      }).catch((error) => {
        throw error
      })

      // Removes all the casters that are not approved for casting the match.
      for (let caster in info['matches'][match]['casters']) {
        if (info['matches'][match]['casters'][caster].pivot.approved !== 1) delete info['matches'][match]['casters'].splice(caster, 1)
      }
    }
    return info['matches']
  },

  getMatchInfo: async (matchID) => {
    if (!matchID) throw Error('Match ID is not defined')
    let info = {}
    info['match'] = await _req('get', Endpoints.MATCHES(matchID)).catch((error) => {
      throw Error(`Match with ID ${matchID} does not exist \n${error}`)
    })

    info['teams'] = _req('get', Endpoints.MATCH_TEAMS(matchID)).catch((error) => {
      throw Error(`Teams for match with ID ${matchID} do not exist \n${error}`)
    })
    info['twitch'] = info['match'].channel_id ? _req('get', Endpoints.TWITCH_CHANNELS(info['match'].channel_id)).catch((error) => {
      throw Error(`Twtich channel for match with ID ${matchID} does not exist \n${error}`)
    }) : null
    info['casters'] = info['match'].channel_id ? _req('get', Endpoints.MATCH_CASTERS(matchID)).catch((error) => {
      throw Error(`Casters for match with ID ${matchID} do not exist \n${error}`)
    }) : null
    info['games'] = _req('get', Endpoints.MATCH_GAMES(matchID)).catch((error) => {
      throw Error(`Games for match with ID ${matchID} do not exist \n${error}`)
    })
    info['replays'] = _req('get', Endpoints.MATCH_REPLAYS(matchID)).catch((error) => {
      throw Error(`Replays for match with ID ${matchID} do not exist \n${error}`)
    })

    await Promise.all(mapObjectToArray(info)).then((promiseArray) => {
      for (let i = 0; i < promiseArray.length; i += 2) {
        if (typeof promiseArray[i + 1] === 'object') {
          if (promiseArray[i] === 'match') continue
          info['match'][promiseArray[i]] = promiseArray[i + 1]
          delete info[promiseArray[i]]
        }
        info[promiseArray[i]] = promiseArray[i + 1]
      }
    }).catch((error) => {
      throw error
    })

    return info['match']
  },

  getPlayoffs: async (numberToRequest) => {
    let info = {}
    info['playoffs'] = _reqMulti('get', Endpoints.PLAYOFFS(), numberToRequest).catch((error) => {
      throw error
    })

    return info['playoffs']
  },

  getPlayoffInfo: async (playoffID) => {
    if (!playoffID) throw Error('Playoff ID is not defined')
    let info = {}
    info['playoff'] = _req('get', Endpoints.PLAYOFFS(playoffID)).catch((error) => {
      throw Error(`Playoff with ID ${playoffID} does not exist \n${error}`)
    })
    info['divisions'] = _req('get', Endpoints.PLAYOFF_DIVISIONS(playoffID)).catch((error) => {
      throw Error(`Divisions for playoff with ID ${playoffID} do not exist \n${error}`)
    })
    info['matches'] = _req('get', Endpoints.PLAYOFF_MATCHES(playoffID)).catch((error) => {
      throw Error(`Matches for playoff with ID ${playoffID} do not exist \n${error}`)
    })

    await Promise.all(mapObjectToArray(info)).then((promiseArray) => {
      for (let i = 0; i < promiseArray.length; i += 2) {
        if (typeof promiseArray[i + 1] === 'object') {
          if (promiseArray[i] === 'playoff') continue
          info['playoff'][promiseArray[i]] = promiseArray[i + 1]
          delete info[promiseArray[i]]
        }
        info[promiseArray[i]] = promiseArray[i + 1]
      }
    }).catch((error) => {
      throw error
    })

    return info['playoff']
  },

  getSeasonCasterStatistics: async (seasonID) => {
    if (!seasonID) throw Error('Season ID is not defined')
    let info = {}
    info['statistics'] = _req('get', Endpoints.SEASON_CASTER_STATISTICS(seasonID)).catch((error) => {
      throw Error(`Season with ID ${seasonID} does not exist \n${error}`)
    })

    await Promise.all(mapObjectToArray(info)).then((promiseArray) => {
      for (let i = 0; i < promiseArray.length; i += 2) {
        info[promiseArray[i]] = promiseArray[i + 1]
      }
    }).catch((error) => {
      throw error
    })

    return info['statistics']
  },

  getSeasons: async (numberToRequest) => {
    let info = {}
    info['seasons'] = _reqMulti('get', Endpoints.SEASONS(), numberToRequest).catch((error) => {
      throw error
    })

    return info['seasons']
  },

  getSeasonInfo: async (seasonID) => {
    if (!seasonID) throw Error('Season ID is not defined')
    let info = {}
    info['season'] = _req('get', Endpoints.SEASONS(seasonID)).catch((error) => {
      throw Error(`Season with ID ${seasonID} does not exist \n${error}`)
    })
    info['teams'] = _req('get', Endpoints.SEASON_TEAMS(seasonID)).catch((error) => {
      throw Error(`Teams for season with ID ${seasonID} do not exist \n${error}`)
    })
    info['divisions'] = _req('get', Endpoints.SEASON_DIVISIONS(seasonID)).catch((error) => {
      throw Error(`Divisions for season with ID ${seasonID} do not exist \n${error}`)
    })
    info['playoffs'] = _req('get', Endpoints.SEASON_PLAYOFFS(seasonID)).catch((error) => {
      throw Error(`Playoffs for season with ID ${seasonID} do not exist \n${error}`)
    })

    await Promise.all(mapObjectToArray(info)).then((promiseArray) => {
      for (let i = 0; i < promiseArray.length; i += 2) {
        if (typeof promiseArray[i + 1] === 'object') {
          if (promiseArray[i] === 'season') continue
          info['season'][promiseArray[i]] = promiseArray[i + 1]
          delete info[promiseArray[i]]
        }
        info[promiseArray[i]] = promiseArray[i + 1]
      }
    }).catch((error) => {
      throw error
    })

    return info['season']
  },

  getSloths: async (numberToRequest) => {
    let info = {}
    info['sloths'] = _reqMulti('get', Endpoints.SLOTHS(), numberToRequest).catch((error) => {
      throw error
    })

    return info['sloths']
  },

  getSlothInfo: async (slothID) => {
    if (!slothID) throw Error('Sloth ID is not defined')
    let info = {}
    info['sloth'] = _req('get', Endpoints.SLOTHS(slothID)).catch((error) => {
      throw Error(`Sloth with ID ${slothID} does not exist \n${error}`)
    })

    await Promise.all(mapObjectToArray(info)).then((promiseArray) => {
      for (let i = 0; i < promiseArray.length; i += 2) {
        info[promiseArray[i]] = promiseArray[i + 1]
      }
    }).catch((error) => {
      throw error
    })

    return info['sloth']
  },

  getTalents: async (numberToRequest) => {
    let info = {}
    info['talents'] = _reqMulti('get', Endpoints.TALENTS(), numberToRequest).catch((error) => {
      throw error
    })

    return info['talents']
  },

  getTalentInfo: async (talentID) => {
    if (!talentID) throw Error('Talent ID is not defined')
    let info = {}
    info['talent'] = _req('get', Endpoints.TALENTS(talentID)).catch((error) => {
      throw Error(`Talent with ID ${talentID} does not exist \n${error}`)
    })

    await Promise.all(mapObjectToArray(info)).then((promiseArray) => {
      for (let i = 0; i < promiseArray.length; i += 2) {
        info[promiseArray[i]] = promiseArray[i + 1]
      }
    }).catch((error) => {
      throw error
    })

    return info['talent']
  },

  getTeams: async (numberToRequest) => {
    let info = {}
    info['teams'] = _reqMulti('get', Endpoints.TEAMS(), numberToRequest).catch((error) => {
      throw error
    })

    return info['teams']
  },

  getTeamInfo: async (teamID) => {
    if (!teamID) throw Error('Team ID is not defined')
    let info = {}
    info['team'] = _req('get', Endpoints.TEAMS(teamID)).catch((error) => {
      throw Error(`Team with ID ${teamID} does not exist \n${error}`)
    })

    info['logo'] = _req('get', Endpoints.TEAM_LOGO(teamID)).catch((error) => {
      if (error.message === 'Parse JSON response') {
        console.log(`Team with ID ${teamID} does not have a custom logo`)
        info['logo'] = {}
      } else {
        throw Error(`Logo for team with ID ${teamID} does not exist \n${error}`)
      }
    })
    info['sloths'] = _req('get', Endpoints.TEAM_SLOTHS(teamID)).catch((error) => {
      throw Error(`Sloths for team with ID ${teamID} do not exist \n${error}`)
    })

    await Promise.all(mapObjectToArray(info)).then((promiseArray) => {
      for (let i = 0; i < promiseArray.length; i += 2) {
        if (typeof promiseArray[i + 1] === 'object') {
          if (promiseArray[i] === 'ban') continue
          info['team'][promiseArray[i]] = promiseArray[i + 1]
          delete info[promiseArray[i]]
        }
        info[promiseArray[i]] = promiseArray[i + 1]
      }
    }).catch((error) => {
      throw error
    })

    return info['team']
  },

  getTeamMatches: async (teamID) => {
    if (!teamID) throw Error('Team ID is not defined')
    let info = {}
    info['matches'] = _req('get', Endpoints.TEAM_MATCHES(teamID)).catch((error) => {
      throw Error(`Matches for team with ID ${teamID} do not exist \n${error}`)
    })

    await Promise.all(mapObjectToArray(info)).then((promiseArray) => {
      for (let i = 0; i < promiseArray.length; i += 2) {
        info[promiseArray[i]] = promiseArray[i + 1]
      }
    }).catch((error) => {
      throw error
    })

    return info['matches']
  },

  getTeamTimelineEntries: async (teamID) => {
    if (!teamID) throw Error('Team ID is not defined')
    let info = {}
    info['entries'] = _req('get', Endpoints.TEAM_TIMELINE(teamID)).catch((error) => {
      throw Error(`Timeline for team with ID ${teamID} does not exist \n${error}`)
    })

    await Promise.all(mapObjectToArray(info)).then((promiseArray) => {
      for (let i = 0; i < promiseArray.length; i += 2) {
        info[promiseArray[i]] = promiseArray[i + 1]
      }
    }).catch((error) => {
      throw error
    })

    return info['entries']
  },

  getTwitchChannels: async (numberToRequest) => {
    let info = {}
    info['channels'] = _reqMulti('get', Endpoints.TWITCH_CHANNELS(), numberToRequest).catch((error) => {
      throw error
    })

    return info['channels']
  },

  getTwitchChannelInfo: async (channelID) => {
    if (!channelID) throw Error('Channel ID is not defined')
    let info = {}
    info['channel'] = _req('get', Endpoints.TWITCH_CHANNELS(channelID)).catch((error) => {
      throw Error(`Twitch channel with ID ${channelID} does not exist \n${error}`)
    })

    await Promise.all(mapObjectToArray(info)).then((promiseArray) => {
      for (let i = 0; i < promiseArray.length; i += 2) {
        info[promiseArray[i]] = promiseArray[i + 1]
      }
    }).catch((error) => {
      throw error
    })

    return info['channel']
  }

}

/*

Rate-Limit tracking

*/

let rateLimitInterval = 100
let lastRequestTime = Date.now() - rateLimitInterval // Initialize to allow instant request at start up.
let requestQueue = []

// prototype multi-request
let _reqMulti = async (type, endpoint, limit) => {
  if (typeof limit !== 'undefined' && typeof limit !== 'number') throw Error('numberToRequest is not of type number')
  let returnData = []
  let pageData = {}
  let pageDataSize
  let currentPage

  let nPagesToRequest

  // Initial request.
  await _req(type, endpoint).then((response) => {
    pageData[1] = response.data
    pageDataSize = response.per_page
    currentPage = response.current_page
    nPagesToRequest = limit ? Math.min(Math.max(Math.ceil(limit / pageDataSize), 1), response.last_page) : response.last_page
  }).catch((error) => {
    throw error
  })

  for (let i = currentPage; i <= nPagesToRequest; i++) {
    pageData[i] = _req('get', endpoint + '?page=' + i).catch((error) => {
      throw error
    })
  }

  await Promise.all(mapObjectToArray(pageData)).then((promiseArray) => {
    for (let i = 0; i < promiseArray.length; i += 2) {
      returnData = returnData.concat(promiseArray[i + 1].data)
    }
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
      requestQueue.push({'type': type, 'endpoint': endpoint})
      let nextRequest = requestQueue.length === 0 ? rateLimitInterval - timeSinceLastRequest : (requestQueue.length - 1) * rateLimitInterval + rateLimitInterval
      setTimeout(() => {
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
        try {
          let response = JSON.parse(rawResponse)
          if (res.statusCode === 200) {
            resolve(response)
          } else if (res.statusCode === 400) {
            reject(Error(`Status Code ${res.statusCode} : Value does not exist`))
          } else {
            reject(Error(`status Code ${res.statusCode} : Invalid request`))
          }
        } catch (err) {
          reject(Error('Parse JSON response'))
        }
      })
    })

    req.on('error', (error) => {
      reject(error)
    })

    req.end()
  })
}

// Maps an object to an array.
let mapObjectToArray = (object) => {
  let objectArray = []
  Object.keys(object).forEach((key) => {
    objectArray.push(key, object[key])
  })
  return objectArray
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
