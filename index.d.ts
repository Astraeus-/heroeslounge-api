declare namespace HeroesLoungeAPI {
    interface Ban {
        id: number;
        hero_id: number | null;
        talent_id: number | null;
        season_id: number | null;
        round_start: number | null;
        round_length: number | null;
        literal: string;
    }

    interface Division {
        id: number;
        title: string;
        slug: string;
        overview_display_title: string | null;
        playoff_id: number | null;
        season_id: number | null;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
    }

    interface DivisionStanding extends Division {
        pivot: {
            div_id: number,
            team_id: number,
            win_count: number,
            match_count: number,
            bye: number,
            active: 0 | 1,
            free_win_count: number,
            position: number;
            created_at: string;
            updated_at: string;
            deleted_at: string | null;
        };
    }

    interface Game {
        id: number;
        duration: string;
        team_one_level: number,
        team_two_level: number,
        yt_link: string | null;
        match_id: number;
        team_one_id: number;
        team_two_id: number;
        map_id: number;
        winner_id: number;
        team_one_ban_one_id: number | null;
        team_one_ban_two_id: number | null;
        team_one_ban_three_id: number | null;
        team_two_ban_one_id: number | null;
        team_two_ban_two_id: number | null;
        team_two_ban_three_id: number | null;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
    }

    interface Hero {
        id: number;
        title: string;
        image_url: string | null;
        attribute_name: string | null;
        translations: string;
        masterleague_id: number | null;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
    }

    interface HeroStat {
        [key: string]: {
            hero: Hero;
            picks: number;
            wins: number;
            bans_by_team: number;
            bans_against_team: number;
        }
    }

    interface Match {
        id: number;
        round: number | null;
        is_played: 0 | 1;
        wbp: string | null;
        schedule_date: string | null;
        tbp: string | null;
        div_id: number | null;
        playoff_id: number | null;
        winner_id: number | null;
        playoff_position: number | null;
        playoff_winner_next: number | null;
        playoff_loser_next: number | null;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
    }

    interface MatchWBP extends Match {
        wbp: string;
    }

    interface Playoff {
        id: number;
        title: string;
        slug: string;
        type: string;
        reg_open: 0 | 1;
        region_id: number;
        season_id: number | null;
        created_at: string;
        updated_at: string;
    }

    interface Replay {
        id: number
        disk_name: string;
        file_name: string;
        file_size: number;
        content_type: string;
        title: string | null;
        description: string | null;
        field: 'replay';
        sort_order: number;
        path: string;
        extension: 'StormReplay';
        created_at: string;
        updated_at: string;
    }

    interface Role {
        id: number;
        title: string;
    }

    interface Season {
        id: number;
        type: number;
        title: string;
        slug: string;
        round_length: number | null;
        current_round: number | null;
        is_active: 0 | 1;
        reg_open: 0 | 1;
        mm_active: 0 | 1;
        region_id: number;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
    }

    interface Sloth {
        id: number;
        title: string;
        battle_tag: string;
        discord_id: string;
        discord_tag: string;
        short_description: string;
        role_id: number | null;
        heroesprofile_id: number | null
        heroesprofile_mmr: number
        region_id: number;
        timezone: string;
        server_preference: string;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
    }

    interface Talent {
        id: number;
        title: string | null;
        replay_title: string | null,
        suspected_replay_title: string | null,
        hero_id: number;
        image_url: string;
        created_at: string;
        updated_at: string;
    }

    interface Team {
        id: number;
        title: string;
        slug: string;
        short_description: string;
        slothrating: number;
        accepting_apps: number;
        disbanded: 0 | 1;
        region_id: number;
        server_preference: string;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
        sloths: TeamSloth[];
    }

    interface TeamLogo {
        id: number;
        disk_name: string;
        file_name: string;
        file_size: number;
        content_type: string;
        title: string | null,
        description: string | null,
        field: 'logo',
        sort_order: number,
        path: string;
        extension: string;
        created_at: string;
        updated_at: string;
    }

    interface TeamSloth extends Sloth {
        pivot: {
            team_id: number;
            sloth_id: number;
            is_captain: 0 | 1;
            created_at: string;
            updated_at: string | null;
        };
    }

    interface TimelineEntry {
        id: number;
        message: string | null;
        type: string;
        pivot: {timeline_id: number, timelineable_id: number};
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
    }

    interface TwitchChannel {
        id: number;
        title: string;
        url: string;
    }

    export class Client {
        constructor(token: string);

        requestHandler: any;

        getBan(banID: number): Promise<Ban>;
        getBans(limit?: number): Promise<Ban[]>;
        getDivision(divisionID: number): Promise<Division>;
        getDivisions(limit?: number): Promise<Division[]>;
        getDivisionHerostats(divisionID: number): Promise<HeroStat[]>;
        getDivisionMatches(divisionID: number): Promise<Match[]>;
        getDivisionRecentresults(divisionID: number): Promise<Match[]>;
        getDivisionStandings(divisionID: number): Promise<DivisionStanding[]>;
        getDivisionStandingsTeam(divisionID: number, teamID: number): Promise<DivisionStanding>;
        getDivisionTeams(divisionID: number): Promise<Team[]>;
        getGame(gameID: number): Promise<Game>;
        getGames(limit?: number): Promise<Game[]>;
        getHero(heroID: number): Promise<Hero>;
        getHeroes(limit?: number): Promise<Hero[]>;
        getMatch(matchID: number): Promise<Match>;
        getMatches(limit?: number): Promise<Match[]>;
        getMatchesToday(tz1: string, tz2?: string): Promise<MatchWBP[]>;
        getMatchesForDate(date: string, tz1: string, tz2: string): Promise<MatchWBP[]>;
        getMatchesWithApprovedCastBetween(startDate: string, endDate: string): Promise<MatchWBP[]>;
        getMatchChannels(matchID: number): Promise<TwitchChannel[]>;
        getMatchCasters(matchID: number): Promise<Sloth[]>;
        getMatchGames(matchID: number): Promise<Game[]>;
        getMatchReplays(matchID: number): Promise<Replay[]>;
        getMatchTeams(matchID: number): Promise<Team[]>;
        getPlayoff(playoffID: number): Promise<Playoff>;
        getPlayoffs(limit?: number): Promise<Playoff[]>;
        getPlayoffDivisions(playoffID: number): Promise<Division[]>;
        getPlayoffMatches(playoffID: number): Promise<Match[]>;
        getRole(roleID: number): Promise<Role>;
        getRoles(limit?: number): Promise<Role[]>;
        getSeasonCasterStatistics(seasonID: number): Promise<any>;
        getSeason(seasonID: number): Promise<Season>;
        getSeasons(limit?: number): Promise<Season[]>;
        getSeasonDivisions(seasonID: number): Promise<Division[]>;
        getSeasonPlayoffs(seasonID: number): Promise<Playoff[]>;
        getSeasonTeams(seasonID: number): Promise<Team[]>;
        getSloth(slothID: number): Promise<Sloth>;
        getSloths(limit?: number): Promise<Sloth[]>;
        getSlothByDiscordId(discordID: string): Promise<Sloth[]>;
        getSlothHerostats(slothID: number): Promise<HeroStat[]>;
        getSlothHerostatsSeason(slothID: number, seasonID: number): Promise<HeroStat[]>;
        getTalent(talentID: number): Promise<Talent>;
        getTalents(limit?: number): Promise<Talent[]>;
        getTeam(teamID: number): Promise<Team>;
        getTeams(limit?: number): Promise<Team[]>;
        getTeamHerostats(teamID: number): Promise<HeroStat[]>;
        getTeamHerostatsSeason(teamID: number, seasonID: number): Promise<HeroStat[]>;
        getTeamMapstats(teamID: number): Promise<any>;
        getTeamMapstatsSeason(teamID: number, seasonID: number): Promise<any>;
        getTeamLogo(teamID: number): Promise<TeamLogo>;
        getTeamMatches(teamID: number): Promise<Match[]>;
        getTeamSloths(teamID: number): Promise<Sloth[]>;
        getTeamTimelineEntries(teamID: number): Promise<TimelineEntry[]>;
        getTwitchChannel(channelID: number): Promise<TwitchChannel>;
        getTwitchChannels(limit?: number): Promise<TwitchChannel[]>;
    }
}

export = HeroesLoungeAPI;
