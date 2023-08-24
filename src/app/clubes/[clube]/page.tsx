import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";

import teams from "../../../../teams.json";

import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { Box } from "@mui/material";

interface ITeam {
  id: number;
  name: string;
  code: string;
  country: string;
  founded: number;
  national: boolean;
  logo: string;
  venue: {
    id: number;
    name: string;
    address: string;
    city: string;
    capacity: number;
    surface: string;
    image: string;
  };
}

interface Props {
  team: ITeam;
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = teams.map(team => ({
//     params: {
//       team: team.toLowerCase()
//     }
//   }))

//   return {
//     paths,
//     fallback: false
//   }
// }

// export const getStaticProps: GetStaticProps = async () => {
//   // fetch to backend
// }

const t = {
  id: 50,
  name: "Manchester City",
  code: "MAC",
  country: "England",
  countryFlag: "https://media-3.api-sports.io/football/teams/10.png",
  founded: 1880,
  national: false,
  logo: "https://media-1.api-sports.io/football/teams/50.png",
  venue: {
    id: 555,
    name: "Etihad Stadium",
    address: "Rowsley Street",
    city: "Manchester",
    capacity: 55097,
    surface: "grass",
    image: "https://media-3.api-sports.io/football/venues/555.png",
  },
};

const Team: NextPage<Props> = ({ team }) => {
  return (
    <Container sx={{ display: "grid", placeItems: "center", minHeight: "calc(100vh - 64px)", padding: "15px" }}>
      <Grid container sx={{ maxWidth: 900 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>{t.name}</Typography>
          <List>
            <ListItem sx={{ height: { xs: "150px", md: "250px" } }}>
              <Box sx={{ position: "relative", width: "100%", maxWidth: "150px", height: "150px", margin: "auto" }}>
                <Image src={t.logo} alt={t.name} fill />
              </Box>
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="País" secondary={t.country}/>
              <ListItemIcon>
                <Image src={t.countryFlag} alt={t.country} width={50} height={35} />
              </ListItemIcon>
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Ano de fundação" secondary={t.founded} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Código" secondary={t.code} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>{t.venue.name}</Typography>
          <List>
            <ListItem sx={{ height: "250px" }}>
              <Box sx={{ position: "relative", width: "100%", maxWidth: "500px", height: "100%", margin: "auto" }}>
                <Image src={t.venue.image} alt={t.venue.name} fill />
              </Box>
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Cidade" secondary={t.venue.city} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Rua" secondary={t.venue.address} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Tipo de campo" secondary={t.venue.surface} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Capacidade" secondary={t.venue.capacity.toLocaleString(undefined)} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Team;
