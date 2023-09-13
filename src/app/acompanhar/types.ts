import type { UserTeam } from "@/contexts/userContext";

export interface LeaguesFetchBody {
  response: Array<{
    league: {
    id: number;
    name: string;
    type?: string;
    logo: string;
  },
  country: {
    name: string;
    code: string;
    flag: string;
  },
  seasons: Array<{
    year?: number;
    start: string;
    end: string;
    current?: string;
    coverage?: any;
  }>
}>
};

export interface FixturesFetchBody {
  response: Array<{
    fixture: {
      status: {
        short?: string;
        long?: string;
      }
      timezone?: string;
      periods?: string;
    }
    teams: any;
    goals: any;
    score: any;
  }>;
}

interface MatchScore {
  home: number;
  away: number;
}

interface Fixture {
  id: number;
  referee: string;
  date: string;
  timestamp: number;
  periods: {
    first: number;
    second: number;
  };
  venue: {
    id: number;
    name: string;
    city: string;
  };
  status: {
    elapsed: number;
  };
  home: {
    id: number;
    name: string;
    logo: string;
    winner: boolean;
  };
  away: {
    id: number;
    name: string;
    logo: string;
    winner: boolean;
  };
  halftime: MatchScore;
  fulltime: MatchScore;
  extratime: Partial<MatchScore>;
  penalty: Partial<MatchScore>;
}

interface League {
  id: number;
  name: string;
  logo: string;
  start: string;
  end: string;
  fixtures: Fixture[];
}

export interface Team extends UserTeam {
  leagues: League[];
}