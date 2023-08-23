import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface Props {
  msg: string;
  close: () => void;
}

export default function Error ({ msg, close }: Props) {
  return (
    <Box sx={{ display: "grid", placeItems: "center", height: "calc(100vh - 64px)" }}>
      <Paper>
        <Typography variant="body1">{msg}</Typography>
        <Button variant="outlined" onClick={close}>Fechar</Button>
      </Paper>
    </Box>
  )
};
