import Container from "@mui/material/Container";
import Box from "@mui/material/Box"; 
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import Link from "next/link";

import appLeaguesJSON from "../../../appLeagues.json";

import type { AppLeagues } from "./types";

const appLeagues = appLeaguesJSON as AppLeagues[];

const Leagues = () => {
  return (
    <Container sx={{ display: "grid", placeItems: "center", minHeight: "calc(100vh - 64px)", padding: "5px" }}>
      <Grid container spacing={2}>
        {appLeagues.map(([country, leagues]) => (
          <Grid item xs={12} md={6} key={country.name}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${country.name}-leagues`}
                id={country.name}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px", width: "100%" }}>
                  <Image src={country.flag} width={50} height={35} alt={country.name} />
                  <Typography>{country.name}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List
                  sx={{
                    overflow: "auto",
                    maxHeight: 150
                  }}
                >
                  {leagues.map((league, index) => (
                    <ListItem key={index}>
                      <ListItemButton>
                        <Link
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            textDecoration: "none",
                          }}
                          href={`/campeonatos/${country.name.toLowerCase()}/${league.id}/${league.start.slice(-4)}`}
                        >
                          <ListItemText primary={league.name} secondary={`Início: ${league.start}`} />
                          <Image src={league.logo} width={35} height={30} alt={league.name} />
                        </Link>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Leagues;
