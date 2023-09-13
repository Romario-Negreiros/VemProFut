interface Country {
  name: string;
  flag: string;
}

interface League {
  id: number;
  name: string;
  logo: string;
  start: string;
}

export type AppLeagues = [Country, League[]];