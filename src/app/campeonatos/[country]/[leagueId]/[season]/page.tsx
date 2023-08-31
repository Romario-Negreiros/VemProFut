import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Image from "next/image";
import Link from "next/link";

import type { NextPage } from "next";

interface Props {
  params: {
    country: string;
    leagueId: string;
    season: string;
  };
}

interface Standing {
  all: {
    played: number;
    win: number;
    lose: number;
    draw: number;
    goals: {
      for: number;
      against: number;
    };
  };
  form: string;
  goalsDiff: number;
  points: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
}

interface ILeague {
  name: string;
  season: number;
  logo: string;
  flag: string;
  standings: Standing[];
}

const getLeague = async (leagueId: string, season: string): Promise<ILeague> => {
  const headers = new Headers({
    "x-rapidapi-host": process.env.RAPIDAPI_HOST as string,
    "x-rapidapi-key": process.env.RAPIDAPI_KEY as string,
  });

  const response = await fetch(`https://v3.football.api-sports.io/standings?league=${leagueId}&season=${season}`, {
    headers,
  });
  const body = await response.json();
  if (body.errors.length !== 0) {
    throw new Error(body.error);
  }
  const league = body.response[0].league;

  return {
    name: league.name,
    season: league.season,
    logo: league.logo,
    flag: league.flag,
    standings: league.standings[0].map((standing: Standing) => ({
      all: standing.all,
      form: standing.form,
      goalsDiff: standing.goalsDiff,
      points: standing.points,
      team: { id: standing.team.id, name: standing.team.name, logo: standing.team.logo },
    })),
  };
};

const League: NextPage<Props> = async ({ params: { country, leagueId, season } }) => {
  const league = await getLeague(leagueId, season);

  return (
    <Container sx={{ padding: "10px" }}>
      <Typography component="h1" variant="h2" sx={{ textAlign: "center" }}>
        {league.name}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", margin: "5px 0 10px 0" }}>
        <Image src={league.logo} width={61} height={60} alt={league.name} priority />
        <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Typography variant="body2">{country.charAt(0).toUpperCase() + country.substring(1)}</Typography>
          <Image src={league.flag} width={25} height={25} alt={league.name} />
          <Typography variant="body2">{league.season}</Typography>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Posição</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Pontos</TableCell>
              <TableCell align="center">Partidas</TableCell>
              <TableCell align="center">Vitórias</TableCell>
              <TableCell align="center">Empates</TableCell>
              <TableCell align="center">Derrotas</TableCell>
              <TableCell align="center">Gols pró</TableCell>
              <TableCell align="center">Gols contra</TableCell>
              <TableCell align="center">Saldo de gols</TableCell>
              <TableCell align="center">Ultimas 5</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {league.standings.map((standing, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center" sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Link
                    href={`/clubes/${standing.team.id}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                      width: "100%",
                      textDecoration: "none",
                    }}
                  >
                    <Image src={standing.team.logo} width={30} height={29} alt={standing.team.name} />
                    {standing.team.name}
                  </Link>
                </TableCell>
                <TableCell align="center">{standing.points}</TableCell>
                <TableCell align="center">{standing.all.played}</TableCell>
                <TableCell align="center">{standing.all.win}</TableCell>
                <TableCell align="center">{standing.all.draw}</TableCell>
                <TableCell align="center">{standing.all.lose}</TableCell>
                <TableCell align="center">{standing.all.goals.for}</TableCell>
                <TableCell align="center">{standing.all.goals.against}</TableCell>
                <TableCell align="center">{standing.goalsDiff}</TableCell>
                <TableCell align="center" sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  {standing.form.split("").map((res, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          bgcolor: res === "W" ? "success.main" : res === "L" ? "error.main" : res === "D" ? "text.secondary" : "",
                        }}
                      ></Box>
                    );
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default League;
