"use client";

import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import type { FC } from "react";

interface Props {
  msg: string;
  close?: () => void;
}

const Message: FC<Props> = ({ msg, close }) => {
  const { back } = useRouter();

  return (
    <Box sx={{ display: "grid", placeItems: "center", height: "calc(100vh - 64px)" }}>
      <Paper>
        <Typography variant="body1">{msg}</Typography>
        {close !== undefined ? <Button variant="outlined" onClick={close}>Fechar</Button> : <Button variant="outlined" onClick={back}>Voltar</Button>}
      </Paper>
    </Box>
  )
};

export default Message;
