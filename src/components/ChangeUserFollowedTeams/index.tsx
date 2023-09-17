/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { useForm } from "react-hook-form";
import BackendError from "@/utils/BackendError";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormTextInput from "../FormTextInput";
import LoadingButton from "@mui/lab/LoadingButton";
import Message from "../Message";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import type { FC } from "react";
import type { Props as IMessage } from "../Message";
import type { User, SetUser } from "@/contexts/userContext";
import type { SubmitHandler } from "react-hook-form";

import appTeams from "../../../appTeams.json";

type Team = (typeof appTeams)[0];

interface Inputs {
  teams: string;
  confirmPassword: string;
}

interface Props {
  user: User;
  setUser: SetUser;
  jwt: string;
  handleCloseModal: () => void;
}

const ChangeUserFollowedTeams: FC<Props> = ({ user, setUser, jwt, handleCloseModal }) => {
  const { control, handleSubmit, setError } = useForm<Inputs>();
  const [message, setMessage] = useState<IMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (user.teams) {
        if (user.teams.every(team => selectedTeams.some(sTeam => sTeam.id === team.id))) {
          setError("teams", { message: "Você não realizou nenhuma alteração nos times em que acompanha." });
        }
      }

      const fetchOptions = {
        method: "PUT",
        headers: new Headers({
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ ...data }),
      };

      const response = await fetch("http://localhost:5000/api/users/update", fetchOptions);
      const { error, success } = await response.json();
      if (error) {
        throw new BackendError(error, response.status);
      }
      setMessage({ msg: success, close: () => handleCloseModal() });
      setUser({ ...user });
    } catch (error) {
      if (error instanceof BackendError) {
        setMessage({
          msg: error.message,
          close: () => setMessage(null),
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addSelectedTeam = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "Unidentified") {
      if (selectedTeams.length >= 3) {
        setError("teams", { message: "Máximo de três times" });
        event.currentTarget.value = "";
        return;
      }

      const selectedTeam = appTeams.find((team) => team.name.toLowerCase() === event.currentTarget.value.toLowerCase());
      if (selectedTeam === undefined) {
        setError("teams", { message: "O time não existe ou não é cobrido pelo site" });
        return;
      }

      setSelectedTeams([...selectedTeams, selectedTeam]);
      event.currentTarget.value = "";
    }
  };

  const removeSelectedTeam = (team: Team) => {
    setSelectedTeams(selectedTeams.filter((sTeam) => (team.id !== sTeam.id ? sTeam : null)));
  };

  if (message) {
    return <Message msg={message.msg} />;
  }
  return (
    <Box sx={{ display: "grid", placeItems: "center", height: "calc(100vh - 64px)" }}>
      <Paper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 3, minWidth: "600px" }}
        elevation={2}
      >
        <Typography component="h1" variant="h4" sx={{ margin: "auto" }}>
          ALTERAR TIMES QUE ACOMPANHA
        </Typography>
        <Box>
          <Typography align="center" variant="body1">
            Escolha até <span style={{ fontWeight: "bold" }}>três</span> times que deseja receber notificações
          </Typography>

          <List>
            {selectedTeams.map((team, index) => (
              <ListItem key={index}>
                <ListItemText primary={team.name} />
                <ListItemButton
                  sx={{ flexGrow: 0, lineHeight: 0 }}
                  disabled={isLoading}
                  onClick={() => {
                    removeSelectedTeam(team);
                  }}
                >
                  <Typography sx={{ margin: "auto" }}>
                    <HighlightOffIcon />
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <FormTextInput
            name="appTeams"
            control={control}
            label="Seleione os times"
            disabled={isLoading || selectedTeams.length >= 3}
            inputProps={{ list: "appTeams-list", onKeyUp: addSelectedTeam }}
          />
          <datalist id="appTeams-list">
            {appTeams.map((team, index) => {
              if (!selectedTeams.includes(team)) {
                return <option key={index} value={team.name} />;
              } else return null;
            })}
          </datalist>
        </Box>
        {isLoading ? (
          <LoadingButton loading variant="outlined">
            Alterar
          </LoadingButton>
        ) : (
          <Button type="submit" variant="outlined">
            Alterar
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default ChangeUserFollowedTeams;
