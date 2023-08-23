/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Message from "@/components/Message";
import FormTextInput from "@/components/FormTextInput";

import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import type { NextPage } from "next";
import type { SubmitHandler } from "react-hook-form";

import teams from "../../../teams.json";

const d = ["Corinthians", "PSG"];

interface Inputs {
  name: string;
  email: string;
  teams: string;
}

const inputRules = {
  required: true,
  maxLength: {
    value: 50,
    message: "Máximo de 50 caracteres",
  },
};

const Register: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedTeams, setSelectedTeams] = useState<string[]>(d);
  const { handleSubmit, reset, control, setError } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      const teams = selectedTeams.join(",");
      const fetchOptions: RequestInit = {
        method: "POST",
        body: JSON.stringify({ ...data, teams }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await fetch("http://localhost:5000/api/users/register", fetchOptions);

      const body = await res.text();
      if (res.ok) {
        reset();
      }
      setMessage(body);
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        setMessage(err.message);
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

      const selectedTeam = event.currentTarget.value;
      if (!teams.some((team) => team.toLowerCase().includes(selectedTeam.toLowerCase()))) {
        setError("teams", { message: "O time não existe ou não é cobrido pelo site" });
        return;
      }

      setSelectedTeams([...selectedTeams, selectedTeam]);
      event.currentTarget.value = "";
    }
  };

  const removeSelectedTeam = (team: string) => {
    setSelectedTeams(selectedTeams.filter((sTeam) => (team !== sTeam ? sTeam : null)));
  };

 if (message !== "") {
    return (
      <Message
        msg={message}
        close={() => {
          setMessage("");
        }}
      />
    );
  }
  return (
    <Box sx={{ display: "grid", placeItems: "center", height: "calc(100vh - 64px)" }}>
      <Paper
        sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 3 }}
        elevation={2}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ width: "100%" }}>
          <FormTextInput name="name" control={control} label="Name" rules={inputRules} disabled={isLoading} />
        </Box>
        <Box sx={{ width: "100%" }}>
          <FormTextInput name="email" control={control} label="Email" type="email" rules={inputRules} disabled={isLoading} />
        </Box>
        <Box>
          <Typography align="center" variant="body1">
            Escolha até <span style={{ fontWeight: "bold" }}>três</span> times que deseja receber notificações
          </Typography>

          <List>
            {selectedTeams.map((team, index) => (
              <ListItem key={index}>
                <ListItemText primary={team} />
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
            name="teams"
            control={control}
            label="Seleione os times"
            disabled={isLoading || selectedTeams.length >= 3}
            inputProps={{ list: "teams-list", onKeyUp: addSelectedTeam }}
          />
          <datalist id="teams-list">
            {teams.map((team, index) => {
              if (!selectedTeams.includes(team)) {
                return <option key={index} value={team} />;
              } else return null;
            })}
          </datalist>
        </Box>

        {isLoading ? (
          <LoadingButton loading variant="outlined">
            Registrar  
          </LoadingButton>
        ) : (
        <Button type="submit" variant="outlined">
          Registrar
        </Button>)}
      </Paper>
    </Box>
  );
}

export default Register;
