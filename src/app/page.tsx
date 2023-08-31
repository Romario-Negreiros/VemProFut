import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function Home() {
  return (
    <Container sx={{ padding: "10px 5px", height: { md: "calc(100vh - 64px)" } }}>
      <Paper
        elevation={4}
        sx={{
          display: "grid",
          placeItems: "center",
          height: "50%",
          padding: "25px",
          marginBottom: 2,
          border: "1px solid",
          borderColor: "primary.main",
        }}
      >
        <Typography component="h1" variant="h2" sx={{ textAlign: "center" }}>
          O melhor site de futebol do Brasil!!
        </Typography>
        <Typography component="h2" variant="body2" sx={{ textAlign: "center" }}>
          Tirando todos os outros.
        </Typography>
      </Paper>
      <Grid container sx={{ height: "50%" }} spacing={2}>
        <Grid item xs={12} sx={{ height: "40%", textAlign: "center" }}>
          <Paper
            elevation={3}
            sx={{
              display: "grid",
              placeItems: "center",
              height: "100%",
              padding: "20px",
              border: "1px solid",
              borderColor: "primary.main",
            }}
          >
            <Typography component="h3" variant="h5">
              Se registre e acompanhe o seu time do coração
            </Typography>
            <Typography component="p" variant="body1">
              Cria uma conta e escolhe até três times para acompanhar, mas não do mesmo país por favor...
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} sx={{ height: "60%", textAlign: "center" }}>
          <Paper
            elevation={2}
            sx={{
              display: "grid",
              placeItems: "center",
              height: "100%",
              padding: "15px",
              border: "1px solid",
              borderColor: "primary.main",
            }}
          >
            <Typography component="h3" variant="h6">
              Busque informações sobre qualquer clube
            </Typography>
            <Typography variant="body1">
              No caso só de alguns países, tem time de futebol demais no mundo pra cobrir de todos os países então
              limitamos somente aqueles que realmente interessam.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} sx={{ height: "60%", textAlign: "center" }}>
          <Paper
            elevation={2}
            sx={{
              display: "grid",
              placeItems: "center",
              height: "100%",
              padding: "15px",
              border: "1px solid",
              borderColor: "primary.main",
            }}
          >
            <Typography component="h3" variant="h6">
              Busque informações sobre campeonatos
            </Typography>
            <Typography variant="body1">
              Não consegue encontrar a tabela da segunda divisão do campeonato acreano? nem a gente, mas ainda temos
              varios campeonatos pra você!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
