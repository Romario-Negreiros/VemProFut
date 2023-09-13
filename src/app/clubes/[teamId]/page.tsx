import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";

import teams from "../../../../appTeams.json";

import type { NextPage } from "next";
import type { Props, ITeam } from "./types";

export const generateStaticParams = () => {
  const paths = teams.map((team) => ({
    teamId: String(team.id),
  }));
  return paths;
};

const getTeam = async (teamId: string): Promise<ITeam> => {
  const response = await fetch(`http://localhost:5000/api/teams/get-one/${teamId}`);
  const { team, error } = await response.json();
  if (error === undefined) {
    return team;
  }
  throw new Error(error);
};

const Team: NextPage<Props> = async ({ params: { teamId } }) => {
  const team = await getTeam(teamId);

  return (
    <Container sx={{ display: "grid", placeItems: "center", minHeight: "calc(100vh - 64px)", padding: "15px" }}>
      <Grid container spacing={{ xs: 0, md: 2 }} sx={{ maxWidth: 900 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {team.name}
          </Typography>
          <List>
            <ListItem sx={{ height: "250px" }}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  margin: "auto",
                  maxWidth: team.name === team.country ? "300px" : "150px",
                  height: team.name === team.country ? "200px" : "150px",
                }}
              >
                <Image src={team.logo} alt={team.name} priority fill />
              </Box>
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="País" secondary={team.translatedCountry} />
              <ListItemIcon>
                <Image src={team.countryFlag} alt={team.country} width={50} height={35} />
              </ListItemIcon>
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Ano de fundação" secondary={team.founded} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Código" secondary={team.code} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {team.venue.name}
          </Typography>
          <List>
            <ListItem sx={{ height: "250px" }}>
              <Box sx={{ position: "relative", width: "100%", maxWidth: "450px", height: "100%", margin: "auto" }}>
                <Image src={team.venue.image} alt={team.venue.name} priority fill />
              </Box>
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Cidade" secondary={team.venue.city} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Rua" secondary={team.venue.address} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Tipo de campo" secondary={team.venue.surface} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Capacidade" secondary={team.venue.capacity.toLocaleString(undefined)} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Team;
