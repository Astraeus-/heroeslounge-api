/* Heroes Lounge Endpoints. */
module.exports.BANS = (banID) => {
  return `/bans${banID ? `/${banID}` : ''}`;
};
module.exports.BANS_ALL = () => {
  return '/bansAll';
};

module.exports.DIVISIONS = (divisionID) => {
  return `/divisions${divisionID ? `/${divisionID}` : ''}`;
};
module.exports.DIVISIONS_ALL = () => {
  return '/divisionsAll';
};
module.exports.DIVISION_HEROSTATS = (divisionID) => {
  return `/divisions/${divisionID}/herostatistics`;
};
module.exports.DIVISION_MATCHES = (divisionID) => {
  return `/divisions/${divisionID}/matches`;
};
module.exports.DIVISION_RECENTRESULTS = (divisionID) => {
  return `/divisions/${divisionID}/recentresults`;
};
module.exports.DIVISION_STANDINGS = (divisionID) => {
  return `/divisions/${divisionID}/standings`;
};
module.exports.DIVISION_STANDINGS_TEAM = (divisionID, teamID) => {
  return `/divisions/${divisionID}/standings/${teamID}`;
};
module.exports.DIVISION_TEAMS = (divisionID) => {
  return `/divisions/${divisionID}/teams`;
};

module.exports.GAMES = (gameID) => {
  return `/games${gameID ? `/${gameID}` : ''}`;
};
module.exports.GAMES_ALL = () => {
  return '/gamesAll';
};
module.exports.GAMES_ALL_WITH_PLAYERS = () => {
  return '/gamesAllWithPlayers';
};

module.exports.HEROES = (heroID) => {
  return `/heroes${heroID ? `/${heroID}` : ''}`;
};
module.exports.HEROES_ALL = () => {
  return '/heroesAll';
};

module.exports.MATCHES = (matchID) => {
  return `/matches${matchID ? `/${matchID}` : ''}`;
};
module.exports.MATCHES_FOR_DATE = (date, tz1, tz2) => {
  return `/matches/forDate/${date}${tz1 ? `/${tz1}${tz2 ? `/${tz2}` : ''}` : ''}`;
};
module.exports.MATCHES_WITH_APPROVED_CAST_BETWEEN = (startDate, endDate) => {
  return `/matches/withApprovedCastBetween/${startDate}/${endDate}`;
};
module.exports.MATCHES_ALL = () => {
  return '/matchesAll';
};
module.exports.MATCHES_TODAY = (tz1, tz2) => {
  return `/matches/today${tz1 ? `/${tz1}${tz2 ? `/${tz2}` : ''}` : ''}`;
};
module.exports.MATCH_TEAMS = (matchID) => {
  return `/matches/${matchID}/teams`;
};
module.exports.MATCH_CASTERS = (matchID) => {
  return `/matches/${matchID}/caster`;
};
module.exports.MATCH_CHANNELS = (matchID) => {
  return `/matches/${matchID}/channels`;
};
module.exports.MATCH_GAMES = (matchID) => {
  return `/matches/${matchID}/games`;
};
module.exports.MATCH_REPLAYS = (matchID) => {
  return `/matches/${matchID}/replays`;
};

module.exports. PLAYOFFS = (playoffID) => {
  return `/playoffs${playoffID ? `/${playoffID}` : ''}`;
};
module.exports.PLAYOFFS_ALL = () => {
  return '/playoffsAll';
};
module.exports.PLAYOFF_DIVISIONS = (playoffID) => {
  return `/playoffs/${playoffID}/divisions`;
};
module.exports.PLAYOFF_MATCHES = (playoffID) => {
  return `/playoffs/${playoffID}/matches`;
};

module.exports.ROLES = (roleID) => {
  return `/roles${roleID ? `/${roleID}` : ''}`;
};

module.exports.SEASONS = (seasonID) => {
  return `/seasons${seasonID ? `/${seasonID}` : ''}`;
};
module.exports.SEASON_ALL = () => {
  return '/seasonsAll';
};
module.exports.SEASON_CASTER_STATISTICS = (seasonID) => {
  return `/seasons/${seasonID}/casterstatistics`;
};
module.exports.SEASON_DIVISIONS = (seasonID) => {
  return `/seasons/${seasonID}/divisions`;
};
module.exports.SEASON_PLAYOFFS = (seasonID) => {
  return `/seasons/${seasonID}/playoffs`;
};
module.exports.SEASON_TEAMS = (seasonID) => {
  return `/seasons/${seasonID}/teams`;
};

module.exports.SLOTH_DISCORD_ID = (discordID) => {
  return `/slothDiscordId/${discordID}`;
};
module.exports.SLOTHS = (slothID) => {
  return `/sloths${slothID ? `/${slothID}` : ''}`;
};
module.exports.SLOTHS_ALL = () => {
  return '/slothsAll';
};
module.exports.SLOTHS_HEROSTATS = (slothID) => {
  return `/sloths/${slothID}/herostatistics`;
};
module.exports.SLOTHS_HEROSTATS_SEASON = (slothID, seasonID) => {
  return `/sloths/${slothID}/season/${seasonID}/herostatistics`;
};

module.exports.TALENTS = (talentID) => {
  return `/talents${talentID ? `/${talentID}` : ''}`;
};
module.exports.TALENTS_ALL = () => {
  return '/talentsAll';
};

module.exports.TEAMS = (teamID) => {
  return `/teams${teamID ? `/${teamID}` : ''}`;
};
module.exports.TEAMS_ALL = () => {
  return '/teamsAll';
};
module.exports.TEAM_HEROSTATS = (teamID) => {
  return `/teams/${teamID}/herostatistics`;
};
module.exports.TEAM_HEROSTATS_SEASON = (teamID, seasonID) => {
  return `/teams/${teamID}/season/${seasonID}/herostatistics`;
};
module.exports.TEAM_MAPSTATS = (teamID) => {
  return `/teams/${teamID}/mapstatistics`;
};
module.exports.TEAM_MAPSTATS_SEASON = (teamID, seasonID) => {
  return `/teams/${teamID}/season/${seasonID}/mapstatistics`;
};
module.exports.TEAM_SLOTHS = (teamID) => {
  return `/teams/${teamID}/sloths`;
};
module.exports.TEAM_LOGO = (teamID) => {
  return `/teams/${teamID}/logo`;
};
module.exports.TEAM_MATCHES = (teamID) => {
  return `/teams/${teamID}/matches`;
};
module.exports.TEAM_TIMELINE = (teamID) => {
  return `/teams/${teamID}/timelines`;
};

module.exports.TIMELINE_ENTRIES = (entryID) => {
  return `/timeline${entryID ? `/${entryID}` : ''}`;
};

module.exports.TWITCH_CHANNELS = (channelID) => {
  return `/channel${channelID ? `/${channelID}` : ''}`;
};
