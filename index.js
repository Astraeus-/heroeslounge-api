// Heroes Lounge API.
const _HTTPS = require('https')

const VERSION = 'v1'
const baseURL = 'heroeslounge.gg'
const API = '/api/' + VERSION

// Heroes Lounge API Methods.
const hlAPI = {

  getCurrentBans: async () => {
    let info = {}
    info['bans'] = _req('get', Endpoints.BANS()).catch((error) => {
      throw Error('Error getting bans ' + '\n' + error)
    })

    for (let element in info) {
      info[element] = await info[element]
    }

    info['bans'] = info['bans'].data

    // Add the hero and talent details to each ban.
    for (let ban in info['bans']) {
      let hero = info['bans'][ban].hero_id ? _req('get', Endpoints.HEROES(info['bans'][ban].hero_id)).catch((error) => {
        throw Error('Hero with ID ' + info['bans'][ban].hero_id + ' does not exist' + '\n' + error)
      }) : null
      let talent = info['bans'][ban].talent_id ? _req('get', Endpoints.TALENTS(info['bans'][ban].talent_id)).catch((error) => {
        throw Error('Talent with ID ' + info['bans'][ban].talent_id + ' does not exist' + '\n' + error)
      }) : null

      delete info['bans'][ban].hero_id
      info['bans'][ban]['hero'] = await hero

      delete info['bans'][ban].talent_id
      info['bans'][ban]['talent'] = await talent
    }
    return info['bans']
  },

  getDivisions: async () => {
    let info = {}
    let divisionData = {}
    let currentPage
    let lastPage

    info['divisions'] = []

    await _req('get', Endpoints.DIVISIONS()).then((response) => {
      divisionData[1] = response
      currentPage = response.current_page
      currentPage++
      lastPage = response.last_page
    }).catch((error) => {
      throw Error('Divisions initial page' + '\n' + error)
    })

    for (let i = currentPage; i <= lastPage; i++) {
      divisionData[currentPage] = _req('get', Endpoints.DIVISIONS() + '?page=' + i).catch((error) => {
        throw Error('Divisions on page ' + currentPage + '\n' + error)
      })
    }

    for (let element in divisionData) {
      divisionData[element] = await divisionData[element]
      info['divisions'] = info['divisions'].concat(divisionData[element].data)
    }

    return info
  },

  getDivisionInfo: async (divisionID) => {
    if (!divisionID) throw Error('Division ID is not defined')
    let info = {}
    info['division'] = _req('get', Endpoints.DIVISIONS(divisionID)).catch((error) => {
      throw Error('Division with ID ' + divisionID + ' does not exist' + '\n' + error)
    })
    info['teams'] = _req('get', Endpoints.DIVISION_TEAMS(divisionID)).catch((error) => {
      throw Error('Teams for division with ID ' + divisionID + ' do not exist' + '\n' + error)
    })

    for (let element in info) {
      info[element] = await info[element]
    }

    return info
  },

  getHeroInfo: async (heroID) => {
    if (!heroID) throw Error('Hero ID is not defined')
    let info = {}
    info['hero'] = _req('get', Endpoints.HEROES(heroID)).catch((error) => {
      throw Error('Hero with ID ' + heroID + ' does not exist' + '\n' + error)
    })

    for (let element in info) {
      info[element] = await info[element]
    }

    return info['hero']
  },

  getMatchesToday: async () => {
    let info = {}
    info['matches'] = _req('get', Endpoints.MATCHES_TODAY()).catch((error) => {
      throw Error('Error getting today\'s matches ' + '\n' + error)
    })

    for (let element in info) {
      info[element] = await info[element]
    }

    for (let match in info['matches']) {
      let teams = info['matches'][match].id ? _req('get', Endpoints.MATCH_TEAMS(info['matches'][match].id)).catch((error) => {
        throw Error('Teams for match with ID ' + info['matches'][match].id + ' do not exist' + '\n' + error)
      }) : null
      let twitch = info['matches'][match].channel_id ? _req('get', Endpoints.TWITCH_CHANNELS(info['matches'][match].channel_id)).catch((error) => {
        throw Error('Twitch channel for match with ID ' + info['matches'][match].id + ' does not exist' + '\n' + error)
      }) : null
      let casters = info['matches'][match].channel_id ? await _req('get', Endpoints.MATCH_CASTERS(info['matches'][match].id)).catch((error) => {
        throw Error('Casters for match with ID ' + info['matches'][match].id + ' do not exist' + '\n' + error)
      }) : null

      // Filters out the denied casters, leaving only the accepted casters.
      for (let caster in casters) {
        if (casters[caster].pivot.approved !== 1) delete casters.splice(caster, 1)
      }

      info['matches'][match]['teams'] = await teams
      info['matches'][match]['twitch'] = await twitch
      info['matches'][match]['casters'] = casters
    }
    return info['matches']
  },

  getMatchInfo: async (matchID) => {
    if (!matchID) throw Error('Match ID is not defined')
    let info = {}
    info['match'] = await _req('get', Endpoints.MATCHES(matchID)).catch((error) => {
      throw Error('Match with ID ' + matchID + ' does not exist' + '\n' + error)
    })
    info['teams'] = _req('get', Endpoints.MATCH_TEAMS(matchID)).catch((error) => {
      throw Error('Teams for match with ID ' + matchID + ' do not exist' + '\n' + error)
    })
    info['twitch'] = info['match'].channel_id ? _req('get', Endpoints.TWITCH_CHANNELS(info['match'].channel_id)).catch((error) => {
      throw Error('Twitch channel for match with ID ' + matchID + ' does not exist' + '\n' + error)
    }) : null
    info['casters'] = info['match'].channel_id ? _req('get', Endpoints.MATCH_CASTERS(matchID)).catch((error) => {
      throw Error('Casters for match with ID ' + matchID + ' do not exist' + '\n' + error)
    }) : null
    info['games'] = _req('get', Endpoints.MATCH_GAMES(matchID)).catch((error) => {
      throw Error('Games for match with ID ' + matchID + ' do not exist' + '\n' + error)
    })
    info['replays'] = _req('get', Endpoints.MATCH_REPLAYS(matchID)).catch((error) => {
      throw Error('Replays for match with ID ' + matchID + ' do not exist' + '\n' + error)
    })

    for (let element in info) {
      info[element] = await info[element]
    }

    return info
  },

  getPlayoffInfo: async (playoffID) => {
    if (!playoffID) throw Error('Playoff ID is not defined')
    let info = {}
    info['playoff'] = _req('get', Endpoints.PLAYOFFS(playoffID)).catch((error) => {
      throw Error('Playoff with ID ' + playoffID + ' does not exist' + '\n' + error)
    })
    info['divisions'] = _req('get', Endpoints.PLAYOFF_DIVISIONS(playoffID)).catch((error) => {
      throw Error('Divisions for playoff with ID ' + playoffID + ' do not exist' + '\n' + error)
    })
    info['matches'] = _req('get', Endpoints.PLAYOFF_MATCHES(playoffID)).catch((error) => {
      throw Error('Matches for playoff with ID ' + playoffID + ' do not exist' + '\n' + error)
    })

    for (let element in info) {
      info[element] = await info[element]
    }

    return info
  },

  getSeasonCasterStatistics: async (seasonID) => {
    if (!seasonID) throw Error('Season ID is not defined')
    let info = {}
    info['statistics'] = _req('get', Endpoints.SEASON_CASTER_STATISTICS(seasonID)).catch((error) => {
      throw Error('Season with ID ' + seasonID + ' does not exist' + '\n' + error)
    })

    for (let element in info) {
      info[element] = await info[element]
    }

    return info['statistics']
  },

  getSeasonInfo: async (seasonID) => {
    if (!seasonID) throw Error('Season ID is not defined')
    let info = {}
    info['season'] = _req('get', Endpoints.SEASONS(seasonID)).catch((error) => {
      throw Error('Season with ID ' + seasonID + ' does not exist' + '\n' + error)
    })
    info['divisions'] = _req('get', Endpoints.DIVISIONS()).catch((error) => {
      throw Error('Can not get divisions ' + error)
    })
    info['playoffs'] = _req('get', Endpoints.SEASON_PLAYOFFS(seasonID)).catch((error) => {
      throw Error('Playoffs for season with ID ' + seasonID + ' do not exist' + '\n' + error)
    })

    for (let element in info) {
      info[element] = await info[element]
    }

    // Get all of the divisions that belong to the season.
    let divisions = []
    for (let div of info['divisions'].data) {
      if (div.season_id === seasonID && div.playoff_id == null) {
        divisions.push(div)
      }
    }
    info['divisions'] = divisions

    return info
  },

  getSlothInfo: async (slothID) => {
    if (!slothID) throw Error('Sloth ID is not defined')
    let info = {}
    info['sloth'] = _req('get', Endpoints.SLOTHS(slothID)).catch((error) => {
      throw Error('Sloth with ID ' + slothID + ' does not exist' + '\n' + error)
    })

    for (let element in info) {
      info[element] = await info[element]
    }

    return info['sloth']
  },

  getTalentInfo: async (talentID) => {
    if (!talentID) throw Error('Talent ID is not defined')
    let info = {}
    info['talent'] = _req('get', Endpoints.TALENTS(talentID)).catch((error) => {
      throw Error('Talent with ID ' + talentID + ' does not exist' + '\n' + error)
    })

    for (let element in info) {
      info[element] = await info[element]
    }

    return info['talent']
  },

  getTeamInfo: async (teamID) => {
    if (!teamID) throw Error('Team ID is not defined')
    let info = {}
    info['team'] = _req('get', Endpoints.TEAMS(teamID)).catch((error) => {
      throw Error('Team with ID ' + teamID + ' does not exist' + '\n' + error)
    })
    info['logo'] = _req('get', Endpoints.TEAM_LOGO(teamID)).catch((error) => {
      throw Error('Logo for team with ID ' + teamID + ' does not exist' + '\n' + error)
    })
    info['sloths'] = _req('get', Endpoints.TEAM_SLOTHS(teamID)).catch((error) => {
      throw Error('Sloths for team with ID ' + teamID + ' do not exist' + '\n' + error)
    })

    for (let element in info) {
      info[element] = await info[element]
    }

    return info
  },

  getTeamMatches: async (teamID) => {
    if (!teamID) throw Error('Team ID is not defined')
    let info = {}
    info['team'] = _req('get', Endpoints.TEAMS(teamID)).catch((error) => {
      throw Error('Team with ID ' + teamID + ' does not exist' + '\n' + error)
    })
    info['matches'] = _req('get', Endpoints.TEAM_MATCHES(teamID)).catch((error) => {
      throw Error('Matches for team with ID ' + teamID + ' do not exist' + '\n' + error)
    })

    for (let element in info) {
      info[element] = await info[element]
    }

    return info
  },

  getTeamTimelineEntries: async (teamID) => {
    if (!teamID) throw Error('Team ID is not defined')
    let info = {}
    info['team'] = _req('get', Endpoints.TEAMS(teamID)).catch((error) => {
      throw Error('Team with ID ' + teamID + ' does not exist' + '\n' + error)
    })
    info['entries'] = _req('get', Endpoints.TEAM_TIMELINE(teamID)).catch((error) => {
      throw Error('Timeline for team with ID ' + teamID + ' does not exist' + '\n' + error)
    })

    for (let element in info) {
      info[element] = await info[element]
    }

    return info
  }

}

// Makes the Request to the Heroes Lounge API.
let _req = (type, endpoint) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: baseURL,
      path: endpoint,
      method: type,
      headers: {
        'Content-Type': 'application/json'
      }
    }

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
            reject(Error('Status Code ' + res.statusCode + ': Value does not exist'))
          } else {
            reject(Error('Status Code ' + res.statusCode + ': Invalid request'))
          }
        } catch (err) {
          reject(Error('Could not parse JSON response'))
        }
      })
    })

    req.on('error', (err) => {
      reject(Error('Error with request: \n' + err))
    })

    req.end()
  })
}

/* Heroes Lounge Endpoints. */
const Endpoints = {

  BANS: (banID) => {
    return API + '/bans' + (banID ? '/' + banID : '')
  },
  BANS_ALL: () => {
    return Endpoints.BANS() + 'All'
  },

  DIVISIONS: (divisionID) => {
    return API + '/divisions' + (divisionID ? '/' + divisionID : '')
  },
  DIVISIONS_ALL: () => {
    return Endpoints.DIVISIONS() + 'All'
  },
  DIVISION_TEAMS: (divisionID) => {
    return Endpoints.DIVISIONS(divisionID) + '/teams'
  },

  HEROES: (heroID) => {
    return API + '/heroes' + (heroID ? '/' + heroID : '')
  },
  HEROES_ALL: () => {
    return Endpoints.HEROES() + 'All'
  },

  MATCHES: (matchID) => {
    return API + '/matches' + (matchID ? '/' + matchID : '')
  },
  MATCHES_ALL: () => {
    return Endpoints.MATCHES() + 'All'
  },
  MATCHES_TODAY: () => {
    return Endpoints.MATCHES() + '/today'
  },
  MATCH_TEAMS: (matchID) => {
    return Endpoints.MATCHES(matchID) + '/teams'
  },
  MATCH_CASTERS: (matchID) => {
    return Endpoints.MATCHES(matchID) + '/caster'
  },
  MATCH_GAMES: (matchID) => {
    return Endpoints.MATCHES(matchID) + '/games'
  },
  MATCH_REPLAYS: (matchID) => {
    return Endpoints.MATCHES(matchID) + '/replays'
  },

  PLAYOFFS: (playoffID) => {
    return API + '/playoffs' + (playoffID ? '/' + playoffID : '')
  },
  PLAYOFFS_ALL: () => {
    return Endpoints.PLAYOFFS() + 'All'
  },
  PLAYOFF_DIVISIONS: (playoffID) => {
    return Endpoints.PLAYOFFS(playoffID) + '/divisions'
  },
  PLAYOFF_MATCHES: (playoffID) => {
    return Endpoints.PLAYOFFS(playoffID) + '/matches'
  },

  SEASONS: (seasonID) => {
    return API + '/seasons' + (seasonID ? '/' + seasonID : '')
  },
  SEASON_ALL: () => {
    return Endpoints.SEASONS() + 'All'
  },
  SEASON_CASTER_STATISTICS: (seasonID) => {
    return Endpoints.SEASONS(seasonID) + '/casterstatistics'
  },
  SEASON_DIVISIONS: (seasonID) => {
    return Endpoints.SEASONS(seasonID) + '/divisions'
  },
  SEASON_PLAYOFFS: (seasonID) => {
    return Endpoints.SEASONS(seasonID) + '/playoffs'
  },
  SEASON_TEAMS: (seasonID) => {
    return Endpoints.SEASONS(seasonID) + '/teams'
  },

  SLOTHS: (slothID) => {
    return API + '/sloths' + (slothID ? '/' + slothID : '')
  },
  SLOTHS_ALL: () => {
    return Endpoints.SLOTHS() + 'All'
  },

  TALENTS: (talentID) => {
    return API + '/talents' + (talentID ? '/' + talentID : '')
  },
  TALENTS_ALL: () => {
    return Endpoints.TALENTS() + 'All'
  },

  TEAMS: (teamID) => {
    return API + '/teams' + (teamID ? '/' + teamID : '')
  },
  TEAMS_ALL: () => {
    return Endpoints.TEAMS() + 'All'
  },
  TEAM_SLOTHS: (teamID) => {
    return Endpoints.TEAMS(teamID) + '/sloths'
  },
  TEAM_LOGO: (teamID) => {
    return Endpoints.TEAMS(teamID) + '/logo'
  },
  TEAM_MATCHES: (teamID) => {
    return Endpoints.TEAMS(teamID) + '/matches'
  },
  TEAM_TIMELINE: (teamID) => {
    return Endpoints.TEAMS(teamID) + '/timelines'
  },

  TIMELINE_ENTRIES: (entryID) => {
    return API + '/timeline' + (entryID ? '/' + entryID : '')
  },

  TWITCH_CHANNELS: (channelID) => {
    return API + '/channel' + (channelID ? '/' + channelID : '')
  }

}

module.exports = hlAPI
