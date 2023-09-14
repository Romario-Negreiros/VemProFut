"use client";

import { useEffect } from "react";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BackendError from "@/utils/BackendError";

export default function Error({ error, reset }: { error: (Error | BackendError) & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container sx={{ display: "grid", placeItems: "center", height: "calc(100vh - 64px)" }}>
      <Paper sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 3 }} elevation={2}>
        <Typography variant="h2">{error instanceof BackendError ? error.message : "Algo deu errado ao carregar os dados do time!"}</Typography>
        <Button variant="outlined" onClick={reset}>
          Tentar novamente
        </Button>
      </Paper>
    </Container>
  );
}
