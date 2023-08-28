"use client";

import { forwardRef, useState } from "react";
import throttle from "@/utils/throttle";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/Button";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import Image from "next/image";
import { TableVirtuoso } from "react-virtuoso";

import appTeams from "../../../appTeams.json";

import type { NextPage } from "next";
import Link from "next/link";

const TableComponents = {
  Scroller: forwardRef<HTMLDivElement>((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
  Table: (props: any) => <Table {...props} style={{ borderCollapse: "separate" }} />,
  TableHead,
  TableRow,
  TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => <TableBody {...props} ref={ref} />),
};

TableComponents.Scroller.displayName = "Scroller";
TableComponents.TableBody.displayName = "TableBody";

const Teams: NextPage = () => {
  const [teams, setTeams] = useState(appTeams);

  const filterTeams = throttle((ev: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = ev.target.value;

    if (searchValue !== "") {
      const filteredTeams = appTeams.filter((team) => {
        if (team.name.toLowerCase().includes(searchValue.toLowerCase())) {
          return team;
        }
        return null;
      });
      setTeams(filteredTeams);
    } else {
      setTeams(appTeams);
    }
  });

  return (
    <Box sx={{ height: "calc(100vh - 64px)", padding: "10px" }}>
      <Paper sx={{ maxWidth: 700, margin: "auto" }}>
        <TextField fullWidth variant="filled" label="Pesquisar time" onChange={filterTeams} />
        <TableVirtuoso
          style={{ height: "calc(100vh - 140px)" }}
          data={teams}
          components={TableComponents}
          fixedHeaderContent={() => (
            <TableRow>
              <TableCell>Escudo</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>País</TableCell>
              <TableCell size="small" sx={{ padding: 0 }}></TableCell>
            </TableRow>
          )}
          itemContent={(_, team) => (
            <>
              <TableCell>
                <Image src={team.logo} width={team.name === team.country ? 35 : 25} height={25} alt={team.name} />
              </TableCell>
              <TableCell>{team.name}</TableCell>
              <TableCell>{team.country}</TableCell>
              <TableCell size="small" sx={{ padding: 0, textAlign: "center" }}>
                <IconButton sx={{ fontSize: 0, lineHeight: 0, minWidth: 0, padding: "5px" }}>
                  <Link href={`/clubes/${team.id}`}>
                    <ReadMoreIcon />
                  </Link>
                </IconButton>
              </TableCell>
            </>
          )}
        />
      </Paper>
    </Box>
  );
};

export default Teams;
