"use client";

import timi from "../../../banananaaaa.json";
import { useState, useEffect, useContext } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Message from "@/components/Message";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import Link from "next/link";

import userContext from "@/contexts/userContext";

import type { NextPage } from "next";
import type { Props as IMessage } from "@/components/Message";
import type { UserTeam } from "@/contexts/userContext";
import { Paper } from "@mui/material";

interface TeamsToQuery {
  id: number;
}

interface MatchScore {
  home: number;
  away: number;
}

interface Fixture {
  id: number;
  referee: string;
  date: string;
  timestamp: number;
  periods: {
    first: number;
    second: number;
  };
  venue: {
    id: number;
    name: string;
    city: string;
  };
  status: string;
  home: {
    id: number;
    name: string;
    logo: string;
    winner: boolean;
  };
  away: {
    id: number;
    name: string;
    logo: string;
    winner: boolean;
  };
  goals: MatchScore;
  halftime: MatchScore;
  extratime: Partial<MatchScore>;
  penalty: Partial<MatchScore>;
}

interface League {
  id: number;
  name: string;
  logo: string;
  start: string;
  end: string;
  fixtures: Fixture[];
}

interface Team extends UserTeam {
  leagues: League[];
}

const getTeamsData = async (teams: TeamsToQuery[]): Promise<Team | null> => {
  return null;
};

const FollowedTeams: NextPage = () => {
  const [teams, setTeams] = useState<Team | null>(null);
  const [message, setMessage] = useState<IMessage | null>(null);
  const { user } = useContext(userContext);

  useEffect(() => {
    // if (!user) {
    //   setMessage({
    //     msg: "É preciso entrar com sua conta para visualizar esta página.",
    //     link: {
    //       href: "/entrar",
    //       text: "ENTRE",
    //     },
    //   });
    //   return;
    // }
    // if (!user.isActive) {
    //   setMessage({
    //     msg: "Sua conta ainda não está ativa, verifique seu email para terminar o registro.",
    //   });
    //   return;
    // }
    // if (!user.teams) {
    //   setMessage({
    //     msg: "Você não está acompanhando nenhum time. Caso queira mudar isso visite o seu perfil.",
    //     link: {
    //       href: `/perfil/${user.id}`,
    //       text: "PERFIL",
    //     },
    //   });
    //   return;
    // }
    // void (async () => {
    //   try {
    //     const teamsToQuery = user.teams.map((team) => ({ id: team.id })) as TeamsToQuery[];
    //     const teamsData = await getTeamsData(teamsToQuery);
    //     setTeams(teamsData);
    //   } catch (error) {
    //     console.log(error);
    //     setMessage({
    //       msg: "Não conseguimos carregar os dados dos seus times, tente voltar e acessar a página novamente.",
    //     });
    //   }
    // })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (message) {
    return <Message msg={message.msg} close={message.close} link={message.link} />;
  } else {
    return (
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
          minHeight: "calc(100vh - 64px)",
          padding: "15px",
        }}
      >
        {new Array(3).fill(Math.random()).map((a) => (
          <Paper sx={{ padding: "10px" }} key={a}>
            {timi.Flamengo.map((league) => (
              <Accordion key={league.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${league.name}`} id={league.name}>
                  <Box sx={{ display: "flex", width: "100%", flexDirection: "column", gap: "5px" }}>
                    <Box
                      sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "baseline" }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography>{league.name}</Typography>
                        <Typography variant="subtitle2">
                          Inicio: {league.start} / Término: {league.end}
                        </Typography>
                      </Box>
                      <Box sx={{ position: "relative", width: "50px", height: "50px" }}>
                        <Image src={league.logo} fill style={{ objectFit: "contain" }} alt={league.name} />
                      </Box>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <List
                    sx={{
                      overflow: "auto",
                      maxHeight: 300,
                    }}
                  >
                    {league.fixtures.map((fixture) => (
                      <ListItem
                        key={String(fixture.id)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}
                        >
                          <Typography variant="body2">
                            {new Date(fixture.timestamp * 1000).toLocaleDateString("pt-BR")} -
                            {new Date(fixture.timestamp * 1000).toLocaleTimeString("pt-BR")}
                          </Typography>
                          <Typography variant="body2">Árbitro: {fixture.referee}</Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}
                        >
                          <Typography variant="body2">Estádio: {fixture.venue.name}</Typography>
                          <Typography variant="body2">Cidade: {fixture.venue.city}</Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            width: "100%",
                          }}
                        >
                          <Link
                            href={`/clubes/${String(fixture.home.id)}`}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "5px",
                              textDecoration: "none",
                              color: "#000",
                            }}
                          >
                            <Box sx={{ position: "relative", width: "50px", height: "50px" }}>
                              <Image
                                src={fixture.home.logo}
                                fill
                                style={{ objectFit: "contain" }}
                                alt={fixture.home.name}
                              />
                            </Box>
                            <Typography variant="body2">{fixture.home.name}</Typography>
                          </Link>
                          <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography variant="subtitle2">
                              {fixture.status.long === "Match Finished"
                                ? fixture.status.long
                                : `${fixture.status.elapsed}'`}
                            </Typography>
                            <Box sx={{ textAlign: "center" }}>
                              <Typography variant="subtitle2">1° TEMPO</Typography>
                              <Typography variant="subtitle2">
                                {fixture.halftime.home} x {fixture.halftime.away}
                              </Typography>
                            </Box>
                            <Box sx={{ textAlign: "center" }}>
                              <Typography variant="subtitle2">2° TEMPO</Typography>
                              <Typography variant="subtitle2">
                                {fixture.fulltime.home} x {fixture.fulltime.away}
                              </Typography>
                            </Box>
                          </Box>
                          <Link
                            href={`/clubes/${String(fixture.away.id)}`}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "5px",
                              textDecoration: "none",
                              color: "#000",
                            }}
                          >
                            <Box sx={{ position: "relative", width: "50px", height: "50px" }}>
                              <Image
                                src={fixture.away.logo}
                                fill
                                style={{ objectFit: "contain" }}
                                alt={fixture.away.name}
                              />
                            </Box>
                            <Typography variant="body2">{fixture.away.name}</Typography>
                          </Link>
                        </Box>
                        <Box></Box>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        ))}
      </Container>
    );
  }
};

export default FollowedTeams;
