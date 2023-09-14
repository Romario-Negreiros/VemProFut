"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import BackendError from "@/utils/BackendError";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Message from "@/components/Message";

import userContext from "@/contexts/userContext";

import type { NextPage } from "next";

interface Params {
  email: string;
  token: string;
}

interface Props {
  params: Params;
}

const VerifyEmail: NextPage<Props> = ({ params }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { email, token } = params;
  const { setUser } = useContext(userContext);
  const { push } = useRouter();

  const verifyEmail = async () => {
    try {
      const fetchOptions: RequestInit = {
        method: "PUT",
      };

      const response = await fetch(
        `http://localhost:5000/api/users/verify-email/${email.replace(/[%]{1}[0-9]*/, "@")}/${token}`,
        fetchOptions
      );

      const { user, jwt, error } = await response.json();
      if (error !== undefined) {
        throw new BackendError(error, response.status);
      }
      setUser(user);
      const jwtExpiration = new Date();
      jwtExpiration.setHours(jwtExpiration.getHours() + 1);
      document.cookie = `jwt=${jwt as string}; expires=${jwtExpiration.toUTCString()}`;
      push("/");
    } catch (error) {
      if (error instanceof BackendError) {
        setMessage(error.message);
      } else {
        setMessage("Não foi possível completar a verificação.")
      }
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (email === undefined || email === null) {
      alert("O parâmetro 'email' está faltando.");
      return;
    }

    if (token === undefined || token === null) {
      alert("O parâmetro 'token' está faltando.");
      return;
    }

    void verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", height: "calc(100vh - 64px)" }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Message
      msg={message}
      close={() => {
        setMessage("");
      }}
    />
  );
};

export default VerifyEmail;
