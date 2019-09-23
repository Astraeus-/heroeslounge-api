// Heroes Lounge API.
const _HTTPS = require('https');
const Endpoints = require('./Endpoints.js');

/* Heroes Lounge API Methods. */
const hlAPI = {
  /**
   * Returns a ban.
   * @param {number} banID - The ID of the ban.
   * @returns {Promise<object>} The ban object.
   */
  getBan: (banID) => {
    if (!banID) throw Error('Ban ID is not defined');

    return _req('get', Endpoints.BANS(banID));
  },

  /**
   * Get a list of all the bans.
   * @param {number} limit - The maximum number of bans to return.
   * @returns {Promise<object[]>} An array of ban objects.
   */
  getBans: (limit) => {
    return _reqMulti('get', Endpoints.BANS(), limit);
  },

  /**
   * Returns a division.
   * @param {number} divisionID - The ID of the division.
   * @returns {Promise<object>} The division object.
   */
  getDivision: (divisionID) => {
    if (!divisionID) throw Error('Division ID is not defined');

    return _req('get', Endpoints.DIVISIONS(divisionID));
  },

  /**
   * Get a list of all the divisions.
   * @param {number} limit - The maximum number of divisions to return.
   * @returns {Promise<object[]>} An array of division objects.
   */
  getDivisions: (limit) => {
    return _reqMulti('get', Endpoints.DIVISIONS(), limit);
  },

  /**
   * Get picks, bans and wins for all heroes.
   * @param {number} divisionID - The ID of the division.
   * @returns {Promise<object>} An object indexed by hero names.
   */
  getDivisionHerostats: (divisionID) => {
    if (!divisionID) throw Error('Division ID is not defined');

    return _req('get', Endpoints.DIVISION_HEROSTATS(divisionID));
  },

  /**
   * Get a list of all the matches.
   * @param {number} divisionID - The ID of the division.
   * @returns {Promise<object[]>} An array of match objects.
   */
  getDivisionMatches: (divisionID) => {
    if (!divisionID) throw Error('Division ID is not defined');

    return _req('get', Endpoints.DIVISION_MATCHES(divisionID));
  },

  /**
   * Get a list of all the matches recently played.
   * @param {number} divisionID - The ID of the division.
   * @returns {Promise<object[]>} An array of match objects.
   */
  getDivisionRecentresults: (divisionID) => {
    if (!divisionID) throw Error('Division ID is not defined');

    return _req('get', Endpoints.DIVISION_RECENTRESULTS(divisionID));
  },

  /**
   * Get the current standings.
   * @param {number} divisionID - The ID of the division.
   * @returns {Promise<object[]>} An array of teams with their score details.
   */
  getDivisionStandings: (divisionID) => {
    if (!divisionID) throw Error('Division ID is not defined');

    return _req('get', Endpoints.DIVISION_STANDINGS(divisionID));
  },

  /**
   * Get the current standing for the team.
   * @param {number} divisionID - The ID of the division.
   * @param {number} teamID - The ID of the team.
   * @returns {Promise<object>} A team with their score details.
   */
  getDivisionStandingsTeam: (divisionID, teamID) => {
    if (!divisionID) throw Error('Division ID is not defined');
    if (!teamID) throw Error('Team ID is not defined');

    return _req('get', Endpoints.DIVISION_STANDINGS_TEAM(divisionID, teamID));
  },

  /**
   * Get a list of all the teams.
   * @param {number} divisionID - The ID of the division.
   * @returns {Promise<object[]>} An array of teams.
   */
  getDivisionTeams: (divisionID) => {
    if (!divisionID) throw Error('Division ID is not defined');

    return _req('get', Endpoints.DIVISION_TEAMS(divisionID));
  },

  /**
   * Returns a game.
   * @param {number} gameID - The ID of the game.
   * @returns {Promise<object>} The game object.
   */
  getGame: (gameID) => {
    if (!gameID) throw Error('Game ID is not defined');

    return _req('get', Endpoints.GAMES(gameID));
  },

  /**
   * Get a list of all the games.
   * @param {number} limit - The maximum number of games to return.
   * @returns {Promise<object[]>} An array of game objects.
   */
  getGames: (limit) => {
    return _reqMulti('get', Endpoints.GAMES(), limit);
  },

  /**
   * Returns a hero.
   * @param {number} heroID - The ID of the hero.
   * @returns {Promise<object>} The hero object.
   */
  getHero: (heroID) => {
    if (!heroID) throw Error('Hero ID is not defined');

    return _req('get', Endpoints.HEROES(heroID));
  },

  /**
   * Get a list of all the heroes.
   * @param {number} limit - The maximum number of heroes to return.
   * @returns {Promise<object[]>} An array of hero objects.
   */
  getHeroes: (limit) => {
    return _reqMulti('get', Endpoints.HEROES(), limit);
  },

  /**
   * Returns a match.
   * @param {number} matchID - The ID of the match.
   * @returns {Promise<object>} The match object.
   */
  getMatch: (matchID) => {
    if (!matchID) throw Error('Match ID is not defined');

    return _req('get', Endpoints.MATCHES(matchID));
  },

  /**
   * Get a list of all the matches.
   * @param {number} limit - The maximum number of matches to return.
   * @returns {Promise<object[]>} An array of match objects.
   */
  getMatches: (limit) => {
    return _reqMulti('get', Endpoints.MATCHES(), limit);
  },

  /**
   * Get a list of of matches for the timezone.
   * @param {string} tz1 - The timezone continent.
   * @param {string} tz2 - The timezone city.
   * @returns {Promise<object[]>} An array of match objects.
   */
  getMatchesToday: (tz1, tz2) => {
    return _req('get', Endpoints.MATCHES_TODAY(tz1, tz2));
  },

  /**
   * Get a list of of matches for the date in the timezone.
   * @param {string} date - The date in YYYY-MM-DD.
   * @param {string} tz1 - The timezone continent.
   * @param {string} tz2 - The timezone city.
   * @returns {Promise<object[]>} An array of match objects.
   */
  getMatchesForDate: (date, tz1, tz2) => {
    if (!date) throw Error('Date is not defined');
    if (!date.match(/\d{4}-\d{1,2}-\d{1,2}/g)) throw Error('Invalid date syntax, must be of type: YYYY-MM-DD');

    return _req('get', Endpoints.MATCHES_FOR_DATE(date, tz1, tz2));
  },

  /**
   * Get a list of of approved casts between two dates.
   * @param {string} startDate - The starting date in YYYY-MM-DD.
   * @param {string} endDate - The ending date in YYYY-MM-DD.
   * @returns {Promise<object[]>}An array of match objects.
   */
  getMatchesWithApprovedCastBetween: (startDate, endDate) => {
    if (!startDate || !endDate) throw Error('Date interval is not defined');
    if (!startDate.match(/\d{4}-\d{1,2}-\d{1,2}/g) ||
        !endDate.match(/\d{4}-\d{1,2}-\d{1,2}/g)) throw Error('Invalid date syntax, must be of type: YYYY-MM-DD');

    return _req('get', Endpoints.MATCHES_WITH_APPROVED_CAST_BETWEEN(startDate, endDate));
  },

  /**
   * Get a list of of channels.
   * @param {number} matchID - The ID of the match.
   * @returns {Promise<object[]>} An array of channel objects.
   */
  getMatchChannels: (matchID) => {
    if (!matchID) throw Error('Match ID is not defined');

    return _req('get', Endpoints.MATCH_CHANNELS(matchID));
  },

  /**
   * Get a list of of signed up casters.
   * @param {number} matchID - The ID of the match.
   * @returns {Promise<object[]>} An array of sloth objects.
   */
  getMatchCasters: (matchID) => {
    if (!matchID) throw Error('Match ID is not defined');

    return _req('get', Endpoints.MATCH_CASTERS(matchID));
  },

  /**
   * Get a list of of games.
   * @param {number} matchID - The ID of the match.
   * @returns {Promise<object[]>} An array of game objects.
   */
  getMatchGames: (matchID) => {
    if (!matchID) throw Error('Match ID is not defined');

    return _req('get', Endpoints.MATCH_GAMES(matchID));
  },

  /**
   * Get a list of of replays.
   * @param {number} matchID - The ID of the match.
   * @returns {Promise<object[]>} An array of replay files.
   */
  getMatchReplays: (matchID) => {
    if (!matchID) throw Error('Match ID is not defined');

    return _req('get', Endpoints.MATCH_REPLAYS(matchID));
  },

  /**
   * Get a list of teams.
   * @param {number} matchID - The ID of the match.
   * @returns {Promise<object[]>} An array of team objects.
   */
  getMatchTeams: (matchID) => {
    if (!matchID) throw Error('Match ID is not defined');

    return _req('get', Endpoints.MATCH_TEAMS(matchID));
  },

  /**
   * Returns a playoff.
   * @param {number} playoffID - The ID of the playoff.
   * @returns {Promise<object>} The playoff object.
   */
  getPlayoff: (playoffID) => {
    if (!playoffID) throw Error('Playoff ID is not defined');

    return _req('get', Endpoints.PLAYOFFS(playoffID));
  },

  /**
   * Get a list of all the playoffs.
   * @param {number} limit - The maximum number of playoffs to return.
   * @returns {Promise<object[]>} An array of playoff objects.
   */
  getPlayoffs: (limit) => {
    return _reqMulti('get', Endpoints.PLAYOFFS(), limit);
  },

  /**
   * Get a list of divisions.
   * @param {number} playoffID - The ID of the playoff.
   * @returns {Promise<object[]>} An array of division objects.
   */
  getPlayoffDivisions: (playoffID) => {
    if (!playoffID) throw Error('Playoff ID is not defined');

    return _req('get', Endpoints.PLAYOFF_DIVISIONS(playoffID));
  },

  /**
   * Get a list of matches.
   * @param {number} playoffID - The ID of the playoff.
   * @returns {Promise<object[]>} An array of match objects.
   */
  getPlayoffMatches: (playoffID) => {
    if (!playoffID) throw Error('Playoff ID is not defined');

    return _req('get', Endpoints.PLAYOFF_MATCHES(playoffID));
  },

  /**
   * Returns a role.
   * @param {number} roleID - The ID of the role.
   * @returns {Promise<object>} The role object.
   */
  getRole: (roleID) => {
    if (!roleID) throw Error('Role ID is not defined');

    return _req('get', Endpoints.ROLES(roleID));
  },

  /**
   * Get a list of all the roles.
   * @param {number} limit - The maximum number of roles to return.
   * @returns {Promise<object[]>} An array of role objects.
   */
  getRoles: (limit) => {
    return _reqMulti('get', Endpoints.ROLES(), limit);
  },

  /**
   * Returns the casting coverage.
   * @param {number} seasonID - The ID of the season.
   * @returns {Promise<object>} An object containing casting coverage.
   */
  getSeasonCasterStatistics: (seasonID) => {
    if (!seasonID) throw Error('Season ID is not defined');

    return _req('get', Endpoints.SEASON_CASTER_STATISTICS(seasonID));
  },

  /**
   * Returns a season.
   * @param {number} seasonID - The ID of the season.
   * @returns {Promise<object>} The season object.
   */
  getSeason: (seasonID) => {
    if (!seasonID) throw Error('Season ID is not defined');

    return _req('get', Endpoints.SEASONS(seasonID));
  },

  /**
   * Get a list of all the seasons.
   * @param {number} limit - The maximum number of seasons to return.
   * @returns {Promise<object[]>} An array of season objects.
   */
  getSeasons: (limit) => {
    return _reqMulti('get', Endpoints.SEASONS(), limit);
  },

  /**
   * Get a list of divisions.
   * @param {number} seasonID - The ID of the season.
   * @returns {Promise<object[]>} An array of division objects.
   */
  getSeasondivisions: (seasonID) => {
    if (!seasonID) throw Error('Season ID is not defined');

    return _req('get', Endpoints.SEASON_DIVISIONS(seasonID));
  },

  /**
   * Get a list of playoffs.
   * @param {number} seasonID - The ID of the season.
   * @returns {Promise<object[]>} An array of playoff objects.
   */
  getSeasonPlayoffs: (seasonID) => {
    if (!seasonID) throw Error('Season ID is not defined');

    return _req('get', Endpoints.SEASON_PLAYOFFS(seasonID));
  },

  /**
   * Get a list of teams.
   * @param {number} seasonID - The ID of the season.
   * @returns {Promise<object[]>} An array of team objects.
   */
  getSeasonTeams: (seasonID) => {
    if (!seasonID) throw Error('Season ID is not defined');

    return _req('get', Endpoints.SEASON_TEAMS(seasonID));
  },

  /**
   * Returns a sloth.
   * @param {number} slothID - The ID of the sloth.
   * @returns {Promise<object>} The sloth object.
   */
  getSloth: (slothID) => {
    if (!slothID) throw Error('Sloth ID is not defined');

    return _req('get', Endpoints.SLOTHS(slothID));
  },

  /**
   * Get a list of all the sloths.
   * @param {number} limit - The maximum number of sloths to return.
   * @returns {Promise<object[]>} An array of sloth objects.
   */
  getSloths: (limit) => {
    return _reqMulti('get', Endpoints.SLOTHS(), limit);
  },

  /**
   * Returns a sloth.
   * @param {number} discordID - The Discord ID of the sloth.
   * @returns {Promise<object>} The sloth object.
   */
  getSlothByDiscordId: (discordID) => {
    if (!discordID) throw Error('Discord ID is not defined');

    return _req('get', Endpoints.SLOTH_DISCORD_ID(discordID));
  },

  /**
   * Get picks, bans and wins for all heroes.
   * @param {number} slothID - The ID of the sloth.
   * @returns {Promise<object>} An object indexed by hero names.
   */
  getSlothHerostats: (slothID) => {
    if (!slothID) throw Error('Sloth ID is not defined');

    return _req('get', Endpoints.SLOTHS_HEROSTATS(slothID));
  },

  /**
   * Get picks, bans and wins for all heroes for a season.
   * @param {number} slothID - The ID of the sloth.
   * @param {number} seasonID - The ID of the season
   * @returns {Promise<object>} An object indexed by hero names.
   */
  getSlothHerostatsSeason: (slothID, seasonID) => {
    if (!slothID) throw Error('Sloth ID is not defined');
    if (!seasonID) throw Error('Season ID is not defined');

    return _req('get', Endpoints.SLOTHS_HEROSTATS_SEASON(slothID, seasonID));
  },

  /**
   * Returns a talent.
   * @param {number} talentID - The ID of the talent.
   * @returns {Promise<object>} The talent object.
   */
  getTalent: (talentID) => {
    if (!talentID) throw Error('Talent ID is not defined');

    return _req('get', Endpoints.TALENTS(talentID));
  },

  /**
   * Get a list of all the talents.
   * @param {number} limit - The maximum number of talents to return.
   * @returns {Promise<object[]>} An array of talent objects.
   */
  getTalents: (limit) => {
    return _reqMulti('get', Endpoints.TALENTS(), limit);
  },

  /**
   * Returns a team.
   * @param {number} teamID - The ID of the team.
   * @returns {Promise<object>} The team object.
   */
  getTeam: (teamID) => {
    if (!teamID) throw Error('Team ID is not defined');

    return _req('get', Endpoints.TEAMS(teamID));
  },

  /**
   * Get a list of all the teams.
   * @param {number} limit - The maximum number of teams to return.
   * @returns {Promise<object[]>} An array of team objects.
   */
  getTeams: (limit) => {
    return _reqMulti('get', Endpoints.TEAMS(), limit);
  },

  /**
   * Get a logo.
   * @param {number} teamID - The ID of the team.
   * @returns {Promise<object>} An object of logo details.
   */
  getTeamLogo: (teamID) => {
    if (!teamID) throw Error('Team ID is not defined');

    return _req('get', Endpoints.TEAM_LOGO(teamID)).catch((error) => {
      if (error.message === 'Parse JSON response') {
        // console.log(`Team with ID ${teamID} does not have a custom logo`)
        return {};
      } else {
        throw Error(`Logo for team with ID ${teamID} does not exist \n${error}`);
      }
    });
  },

  /**
   * Get a list of matches.
   * @param {number} teamID - The ID of the team.
   * @returns {Promise<object>} An array of match objects.
   */
  getTeamMatches: (teamID) => {
    if (!teamID) throw Error('Team ID is not defined');

    return _req('get', Endpoints.TEAM_MATCHES(teamID));
  },

  /**
   * Get a list of sloths.
   * @param {number} teamID - The ID of the team.
   * @returns {Promise<object[]>} An array of sloth objects.
   */
  getTeamSloths: (teamID) => {
    if (!teamID) throw Error('Team ID is not defined');

    return _req('get', Endpoints.TEAM_SLOTHS(teamID));
  },

  /**
   * Get a list of timeline entries.
   * @param {number} teamID - The ID of the team.
   * @returns {Promise<object[]>} An array of timeline entries.
   */
  getTeamTimelineEntries: (teamID) => {
    if (!teamID) throw Error('Team ID is not defined');

    return _req('get', Endpoints.TEAM_TIMELINE(teamID));
  },

  /**
   * Returns a channel.
   * @param {number} channelID - The ID of the channel.
   * @returns {Promise<object>} The channel object.
   */
  getTwitchChannel: (channelID) => {
    if (!channelID) throw Error('Channel ID is not defined');

    return _req('get', Endpoints.TWITCH_CHANNELS(channelID));
  },

  /**
   * Get a list of all the channels.
   * @param {number} limit - The maximum number of channels to return.
   * @returns {Promise<object[]>} An array of channel objects.
   */
  getTwitchChannels: (limit) => {
    return _reqMulti('get', Endpoints.TWITCH_CHANNELS(), limit);
  }
};

/*

Rate-Limit tracking

*/

let rateLimitInterval = 100;
let lastRequestTime = Date.now() - rateLimitInterval; // Initialize to allow instant request at start up.
let requestQueue = [];

let _reqMulti = async (type, endpoint, limit) => {
  if (typeof limit !== 'undefined' && typeof limit !== 'number') throw TypeError('limit is not of type number');
  if (limit === 0) return [];

  let returnData = [];
  let pageData = [];
  let pageDataSize;
  let currentPage;

  let nPagesToRequest;

  // Initial request.
  const initialRequest = await _req(type, endpoint).catch((error) => {
    throw error;
  });

  pageDataSize = initialRequest.per_page;
  currentPage = initialRequest.current_page;
  nPagesToRequest = limit ? Math.min(Math.max(Math.ceil(Math.abs(limit) / pageDataSize), 1), initialRequest.last_page) : initialRequest.last_page;

  if (typeof limit === 'undefined' || limit >= 0) {
    pageData.push(initialRequest);
    for (let i = currentPage + 1; i <= nPagesToRequest; i++) {
      pageData.push(_req('get', endpoint + '?page=' + i));
    }
  } else if (limit < 0) {
    for (let i = initialRequest.last_page; i > initialRequest.last_page - nPagesToRequest; i--) {
      pageData.push(_req('get', endpoint + '?page=' + i));
    }
  }

  await Promise.all(pageData).then((values) => {
    values.forEach((value) => {
      returnData = returnData.concat(value.data);
    });
  }).catch((error) => {
    throw error;
  });

  if (returnData.length > Math.abs(limit)) {
    returnData = limit >= 0 ? returnData.slice(0, limit) : returnData.slice(limit, returnData.length);
  }

  return returnData;
};

let _req = (type, endpoint) => {
  let timeSinceLastRequest = Date.now() - lastRequestTime;
  lastRequestTime = Date.now();

  return new Promise((resolve, reject) => {
    const options = {
      hostname: Endpoints.BASEURL,
      path: `${Endpoints.API}${endpoint}`,
      method: type,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (timeSinceLastRequest >= rateLimitInterval) {
      makeRequest(options).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    } else {
      requestQueue.push({ 'type': type, 'endpoint': endpoint });
      let nextRequest = requestQueue.length === 0 ? rateLimitInterval - timeSinceLastRequest : (requestQueue.length - 1) * rateLimitInterval + rateLimitInterval;
      setTimeout(() => {
        deleteRequestQueueElement(options.method, options.path);
        makeRequest(options).then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      }, nextRequest);
    }
  });
};

let makeRequest = (options) => {
  return new Promise((resolve, reject) => {
    const req = _HTTPS.request(options, (res) => {
      let rawResponse = '';
      res.setEncoding('utf8');

      res.on('data', (d) => {
        rawResponse += d;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            let response = JSON.parse(rawResponse);
            resolve(response);
          } catch (err) {
            reject(Error('Parse JSON response'));
          }
        } else if (res.statusCode === 400) {
          reject(Error(`Status Code ${res.statusCode}: Value for ${options.path} does not exist`));
        } else {
          reject(Error(`status Code ${res.statusCode}: Invalid request for ${options.path}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
};

let deleteRequestQueueElement = (type, endpoint) => {
  let arrayIndex = requestQueue.findIndex((request) => {
    return request.type === type && request.endpoint === endpoint;
  });
  requestQueue.splice(arrayIndex, 1);
};

module.exports = hlAPI;
