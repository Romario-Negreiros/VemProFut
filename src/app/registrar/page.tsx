/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Message from "@/components/Message";

import type { SubmitHandler } from "react-hook-form";

import teams from "../../../teams.json";

const d = ["Corinthians", "PSG"];

interface Inputs {
  name: string;
  email: string;
  teams: string;
}

const inputValidationOptions = {
  required: true,
  maxLength: {
    value: 50,
    message: "Máximo de 50 caracteres",
  },
};

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedTeams, setSelectedTeams] = useState<string[]>(d);
  const { register, handleSubmit, reset } = useForm<Inputs>();

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
        alert("n pode mais q 3");
        return;
      }

      const selectedTeam = event.currentTarget.value;
      if (!teams.some((team) => team.toLowerCase().includes(selectedTeam.toLowerCase()))) {
        alert("time n existe ou n cobrido por nois");
        return;
      }

      setSelectedTeams([...selectedTeams, selectedTeam]);
      event.currentTarget.value = "";
    }
  };

  const removeSelectedTeam = (team: string) => {
    setSelectedTeams(selectedTeams.filter((sTeam) => (team !== sTeam ? sTeam : null)));
  };

  if (isLoading) {
    return <div>carragenado</div>;
  } else if (message !== "") {
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
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", inputValidationOptions)} />
        <input type="email" {...register("email", inputValidationOptions)} />
        <fieldset>
          <legend>
            Escolha até <span>três</span> times que deseja receber notificações
          </legend>

          <ul>
            {selectedTeams.map((team, index) => (
              <li key={index}>
                {team}
                <button
                  type="button"
                  onClick={() => {
                    removeSelectedTeam(team);
                  }}
                >
                  [X]
                </button>
              </li>
            ))}
          </ul>

          <input list="teams" onKeyUp={addSelectedTeam}/>
          <datalist id="teams">
            {teams.map((team, index) => {
              if (!selectedTeams.includes(team)) {
                return <option key={index} value={team} />;
              } else return null;
            })}
          </datalist>
        </fieldset>

        <button type="submit">Registrar</button>
      </form>
    </main>
  );
}
