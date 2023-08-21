/* eslint-disable @next/next/no-page-custom-font */
"use client";

import { useState } from "react";

import Header from "../components/Header";

import userContext from "@/contexts/userContext";

import type { User } from "@/contexts/userContext";

import "./global.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <html lang="pt-BR">
      <head>
        <title>VemProFut</title>
      </head>
      <body>
        <userContext.Provider value={{user, setUser}}>
          <Header />
          {children}
        </userContext.Provider>
      </body>
    </html>
  );
}
