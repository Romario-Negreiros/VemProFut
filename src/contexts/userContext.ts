import { createContext } from "react";

import type { Dispatch, SetStateAction } from "react";

export interface Team {
  id: number;
  name: string;
  code?: string;
  country: string;
  translatedCountry: string;
  countryFlag: string;
  founded?: number;
  logo: string;
  venue: {
    id: number;
    name: string;
    address?: string;
    city?: string;
    capacity: number;
    surface?: string;
    image: string;
  } | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  teams: Team[] | null;
  createdAt: string;
  isActive: number;
}

export type SetUser = Dispatch<SetStateAction<User | null>>;

interface IUserContext {
  user: User | null;
  setUser: SetUser;
}

const defaultValue = {
  user: null,
  setUser: () => {},
};

export default createContext<IUserContext>(defaultValue);
