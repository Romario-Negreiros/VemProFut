"use client";

import { useState, useEffect, useContext } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Message from "@/components/Message";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import Link from "next/link";

import userContext from "@/contexts/userContext";

import type { NextPage } from "next";
import type { Props as IMessage } from "@/components/Message";
import type { User, UserTeam } from "@/contexts/userContext";
import { Paper } from "@mui/material";

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
  status: {
    elapsed: number;
  };
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
  halftime: MatchScore;
  fulltime: MatchScore;
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

const getTeamsData = async ({ teams }: User): Promise<Team[]> => {
  const fetchOptions = {
    method: "GET",
    headers: new Headers({
      "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST as string,
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY as string,
    }),
  };

  const teamsWithLeagues: Team[] = [];

  for (const team of teams) {
    const leaguesFetchResponse = await fetch(
      `https://v3.football.api-sports.io/leagues?current=true&team=${team.id as number}`,
      fetchOptions
    );
    const leaguesFetchBody = (await leaguesFetchResponse.json()) as { response: any[] };
    const leagues = [];
    for (const data of leaguesFetchBody.response) {
      console.log(data);
      const fixturesFetchResponse = await fetch(
        `https://v3.football.api-sports.io/fixtures?league=${data.league.id as string}&season=${
          data.seasons[0].year as string
        }&team=${team.id as number}`,
        fetchOptions
      );
      const fixturesFetchBody = (await fixturesFetchResponse.json()) as { response: any[] };
      delete data.seasons[0].coverage;
      delete data.seasons[0].current;
      delete data.seasons[0].year;
      delete data.league.type;
      const fixtures = fixturesFetchBody.response.map((item) => {
        console.log(item);
        delete item.fixture.status.short;
        delete item.fixture.status.long;
        delete item.fixture.timezone;
        return { ...item.fixture, ...item.teams, goals: item.goals, ...item.score };
      });
      leagues.push({ ...data.league, ...data.seasons[0], fixtures });
    }
    teamsWithLeagues.push({ ...team, leagues });
  }
  return teamsWithLeagues;
};

const FollowedTeams: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [message, setMessage] = useState<IMessage | null>(null);
  const { user } = useContext(userContext);

  useEffect(() => {
    console.log(user);
    void (async () => {
      try {
        //   if (!user) {
        //     setMessage({
        //       msg: "É preciso entrar com sua conta para visualizar esta página.",
        //       link: {
        //         href: "/entrar",
        //         text: "ENTRE",
        //       },
        //     });
        //     return;
        //   }
        //   if (!user.isActive) {
        //     setMessage({
        //       msg: "Sua conta ainda não está ativa, verifique seu email para terminar o registro.",
        //     });
        //     return;
        //   }
        //   if (!user.teams) {
        //     setMessage({
        //       msg: "Você não está acompanhando nenhum time. Caso queira mudar isso visite o seu perfil.",
        //       link: {
        //         href: `/perfil/${user.id}`,
        //         text: "PERFIL",
        //       },
        //     });
        //     return;
        //   }

        const teamsData = await getTeamsData({
          teams: [{ id: 127, name: "Coringudo fake", logo: "https://media-3.api-sports.io/football/teams/127.png" }],
        });
        setTeams(teamsData);
      } catch (error) {
        console.log(error);
        setMessage({
          msg: "Não conseguimos carregar os dados dos seus times, tente voltar e acessar a página novamente.",
        });
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Container>carregando</Container>;
  } else if (message) {
    return <Message msg={message.msg} close={message.close} link={message.link} />;
  } else if (!teams) {
    return (
      <Message
        msg={
          "O usuário não acompanha nenhum time ou não foi possível carregar os dados, tente voltar e acessar pagina novamente."
        }
      />
    );
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
        {teams.map((team) => (
          <Paper sx={{ padding: "10px" }} key={team.id}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h5">{team.name}</Typography>
              <Box sx={{ position: "relative", width: "80px", height: "80px" }}>
                <Image src={team.logo as string} fill style={{ objectFit: "contain" }} alt={team.name as string} />
              </Box>
            </Box>
            <Typography variant="h6" sx={{ textAlign: "center", textTransform: "uppercase" }}>
              Campeonatos disputados ou em disputa este ano
            </Typography>
            {team.leagues.map((league) => (
              <Accordion key={league.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${league.name}`} id={league.name}>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
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
                          sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="body2">{fixture.venue.name}</Typography>
                          <Typography variant="body2">{fixture.venue.city}</Typography>
                        </Box>
                          <Box
                            sx={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="body2">
                              {new Date(fixture.timestamp * 1000).toLocaleDateString("pt-BR")} -
                              {new Date(fixture.timestamp * 1000).toLocaleTimeString("pt-BR")}
                            </Typography>
                            <Typography variant="body2">Árbitro: {fixture.referee}</Typography>
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
                              width: "100px",
                              textDecoration: "none",
                              color: "#000",
                            }}
                          >
                            <Box
                              sx={{
                                position: "relative",
                                width: "50px",
                                height: "50px",
                              }}
                            >
                              <Image
                                src={fixture.home.logo}
                                fill
                                style={{ objectFit: "contain" }}
                                alt={fixture.home.name}
                              />
                            </Box>
                            <Typography variant="body2" sx={{ textAlign: "center" }}>
                              {fixture.home.name}
                            </Typography>
                          </Link>
                          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography variant="subtitle2">
                              {fixture.status.elapsed >= 90 ? "Encerrado" : `${fixture.status.elapsed}'`}
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
                            {fixture.extratime.home && (
                              <Box sx={{ textAlign: "center" }}>
                                <Typography variant="subtitle2">PRORROGAÇÃO</Typography>
                                <Typography variant="subtitle2">
                                  {fixture.extratime.home} x {fixture.extratime.away}
                                </Typography>
                              </Box>
                            )}
                            {fixture.penalty.home && (
                              <Box sx={{ textAlign: "center" }}>
                                <Typography variant="subtitle2">PÊNALTIS</Typography>
                                <Typography variant="subtitle2">
                                  {fixture.penalty.home} x {fixture.penalty.away}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                          <Link
                            href={`/clubes/${String(fixture.away.id)}`}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "5px",
                              width: "100px",
                              textDecoration: "none",
                              color: "#000",
                            }}
                          >
                            <Box
                              sx={{
                                position: "relative",
                                width: "50px",
                                height: "50px",
                              }}
                            >
                              <Image
                                src={fixture.away.logo}
                                fill
                                style={{ objectFit: "contain" }}
                                alt={fixture.away.name}
                              />
                            </Box>
                            <Typography variant="body2" sx={{ textAlign: "center" }}>
                              {fixture.away.name}
                            </Typography>
                          </Link>
                        </Box>
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
