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
  const [message, setMessage] = useState('');
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

  const addSelectedTeam = (team: string) => {
    if (selectedTeams.length >= 3) {
      alert("Só pode tres porra n sabe ler");
      return;
    }

    setSelectedTeams([...selectedTeams, team]);
  };

  const removeSelectedTeam = (team: string) => {
    setSelectedTeams(selectedTeams.filter((sTeam) => (team !== sTeam ? sTeam : null)));
  };

  if (isLoading) {
    return (
      <div>
        carragenado
      </div>
    )
  } else if (message !== '') {
    return (
      <Message msg={message} close={() => { setMessage('') }}/>
    )
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
            {selectedTeams.map((team) => (
              <li key={team}>
                {team}{" "}
                <button
                  onClick={() => {
                    removeSelectedTeam(team);
                  }}
                >
                  [X]
                </button>
              </li>
            ))}
          </ul>

          <input list="teams" />
          <datalist id="teams">
            {teams.map((team) => {
              if (!selectedTeams.includes(team)) {
                return (
                  <option
                    key={team}
                    onClick={() => {
                      addSelectedTeam(team);
                    }}
                    value={team}
                  />
                );
              } else return null;
            })}
          </datalist>
        </fieldset>

        <button type="submit">Registrar</button>
      </form>
    </main>
  );
}
