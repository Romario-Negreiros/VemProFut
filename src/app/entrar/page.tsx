/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import FormTextInput from "@/components/FormTextInput";
import Message from "@/components/Message";

import userContext from "@/contexts/userContext";

import type { NextPage } from "next";
import type { SubmitHandler } from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
}

const inputRules = {
  required: true,
  minLength: {
    value: 6,
    message: "Minimo de 6 caracteres",
  },
  maxLength: {
    value: 50,
    message: "Máximo de 50 caracteres",
  },
};

const SignIn: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { setUser } = useContext(userContext);
  const { handleSubmit, control } = useForm<Inputs>();
  const { push } = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      const fetchOptions = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await fetch("http://localhost:5000/api/users/sign-in", fetchOptions);

      const { user, jwt, error } = await res.json();
      if (error === undefined) {
        setUser(user);
        const jwtExpiration = new Date();
        jwtExpiration.setHours(jwtExpiration.getHours() + 1);
        document.cookie = `jwt=${jwt as string}; expires=${jwtExpiration.toUTCString()}`;
        push("/");
      }
      throw new Error(error);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (message !== "") {
    return <Message msg={message} close={() => setMessage("")} />;
  }
  return (
    <Box sx={{ display: "grid", placeItems: "center", height: "calc(100vh - 64px)" }}>
      <Paper
        sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 3, minWidth: "600px" }}
        elevation={2}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography component="h1" variant="h4" sx={{ margin: "auto" }}>
          ENTRE
        </Typography>
        <Box sx={{ width: "100%" }}>
          <FormTextInput
            name="email"
            control={control}
            label="Email"
            type="email"
            rules={inputRules}
            disabled={isLoading}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <FormTextInput
            name="password"
            control={control}
            label="Password"
            type="password"
            rules={inputRules}
            disabled={isLoading}
          />
        </Box>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography>Ainda não possui conta?</Typography>
          <Link component={NextLink} href="/registrar">
            <Typography variant="body2">REGISTRE-SE</Typography>
          </Link>
        </Box>

        {isLoading ? (
          <LoadingButton loading variant="outlined">
            Entrar
          </LoadingButton>
        ) : (
          <Button type="submit" variant="outlined">
            Entrar
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default SignIn;
