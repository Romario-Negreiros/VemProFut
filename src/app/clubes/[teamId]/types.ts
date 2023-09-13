export interface ITeam {
  id: number;
  name: string;
  code: string;
  country: string;
  countryFlag: string;
  translatedCountry: string;
  founded: number;
  national: boolean;
  logo: string;
  venue: {
    id: number;
    name: string;
    address: string;
    city: string;
    capacity: number;
    surface: string;
    image: string;
  };
}

export interface Props {
  params: {
    teamId: string;
  };
}