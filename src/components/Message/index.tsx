import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import NextLink from "next/link";

import type { FC } from "react";

export interface Props {
  msg: string;
  close?: () => void;
  link?: {
    href: string;
    text: string;
  };
}

const Message: FC<Props> = ({ msg, close, link }) => {
  const { back } = useRouter();

  return (
    <Box sx={{ display: "grid", placeItems: "center", height: "calc(100vh - 64px)" }}>
      <Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", padding: "10px" }}>
        <Typography variant="body1">{msg}</Typography>
        <br />
        {link ? (
          <Link component={NextLink} href={link.href}>
            <Typography>{link.text}</Typography>
          </Link>
        ) : null}
        {close ? (
          <Button variant="outlined" onClick={close}>
            Fechar
          </Button>
        ) : (
          <Button variant="outlined" onClick={back}>
            Voltar
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default Message;
