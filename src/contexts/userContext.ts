import { createContext } from "react";

import type { Dispatch, SetStateAction } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  teams: Array<{
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
  }>;
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
