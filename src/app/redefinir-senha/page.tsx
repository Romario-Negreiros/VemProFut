/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import FormTextInput from "@/components/FormTextInput";
import Message from "@/components/Message";

import type { NextPage } from "next";
import type { SubmitHandler } from "react-hook-form";

interface Props {
  params: {
    email: string;
    token: string;
  };
}

interface Input {
  newPassword: string;
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

const ResetPassword: NextPage<Props> = ({ params: { email, token } }) => {
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

      const res = await fetch(`http://localhost:5000/api/users/reset-password/${email}/${token}`, fetchOptions);

      const { success, error } = await res.json();
      if (error === undefined) {
        reset();
        setMessage(success);
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
          Insira uma nova senha
        </Typography>
        <Box sx={{ width: "100%" }}>
          <FormTextInput
            name="newPassword"
            control={control}
            label="Senha"
            type="password"
            rules={inputRules}
            disabled={isLoading}
          />
        </Box>
        {isLoading ? (
          <LoadingButton loading variant="outlined">
            Redefinir
          </LoadingButton>
        ) : (
          <Button type="submit" variant="outlined">
            Redefinir
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default ResetPassword;
