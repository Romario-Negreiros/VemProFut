/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import BackendError from "@/utils/BackendError";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import FormTextInput from "@/components/FormTextInput";
import Message from "@/components/Message";

import type { NextPage } from "next";
import type { SubmitHandler } from "react-hook-form";

interface Input {
  email: string;
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

const ForgotPassword: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { handleSubmit, control, reset } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    try {
      setIsLoading(true);
      const fetchOptions = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("http://localhost:5000/api/users/forgot-password", fetchOptions);

      const { success, error } = await response.json();
      if (error !== undefined) {
        throw new BackendError(error, response.status);
      }
      reset();
      setMessage(success);
    } catch (error) {
      if (error instanceof BackendError) {
        setMessage(error.message);
      } else {
        setMessage("Não foi possível completar a ação.");
      }
      console.error(error);
    } finally {
      setIsLoading(true);
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
          Insira seu email para receber um link de redefinição de senha
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
        {isLoading ? (
          <LoadingButton loading variant="outlined">
            Enviar
          </LoadingButton>
        ) : (
          <Button type="submit" variant="outlined">
            Enviar
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
