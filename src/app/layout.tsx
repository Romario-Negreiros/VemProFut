/* eslint-disable @next/next/no-page-custom-font */
"use client";

import { useState } from "react";

import AppBar from "../components/AppBar";

import userContext from "@/contexts/userContext";

import type { User } from "@/contexts/userContext";

import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <html lang="pt-BR">
      <head>
        <title>VemProFut</title>
      </head>
      <body>
        <userContext.Provider value={{ user, setUser }}>
          <AppBar />
          {children}
        </userContext.Provider>
      </body>
    </html>
  );
}
