/* eslint-disable @next/next/no-page-custom-font */
"use client";

import { useState } from "react";

import Header from "../components/Header";

import userContext from "@/contexts/userContext";

import type { User } from "@/contexts/userContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
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
