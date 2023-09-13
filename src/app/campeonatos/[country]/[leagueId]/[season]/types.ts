export interface Props {
  params: {
    country: string;
    leagueId: string;
    season: string;
  };
}

export interface Standing {
  all: {
    played: number;
    win: number;
    lose: number;
    draw: number;
    goals: {
      for: number;
      against: number;
    };
  };
  form: string;
  goalsDiff: number;
  points: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
}

export interface ILeague {
  name: string;
  season: number;
  logo: string;
  flag: string;
  standings: Standing[];
}
