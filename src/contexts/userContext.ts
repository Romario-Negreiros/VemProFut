import { createContext } from "react";

import type { Dispatch, SetStateAction } from "react";

export interface User {
  name: string;
  email: string;
  teams: string[];
  created_at: string;
  is_active: number;
}

interface IUserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const defaultValue = {
  user: null,
  setUser: () => {}
}

export default createContext<IUserContext>(defaultValue);
