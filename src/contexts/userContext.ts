import { createContext } from "react";

import type { Dispatch, SetStateAction } from "react";

export interface UserTeam {
  id?: number;
  name?: string;
  code?: string;
  country?: string;
  translatedCountry?: string;
  countryFlag?: string;
  founded?: number;
  logo?: string;
  venue: {
    id?: number;
    name?: string;
    address?: string;
    city?: string;
    capacity?: number;
    surface?: string;
    image?: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  teams: UserTeam[];
  createdAt: string;
  isActive: number;
}

interface IUserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const defaultValue = {
  user: null,
  setUser: () => {},
};

export default createContext<IUserContext>(defaultValue);
