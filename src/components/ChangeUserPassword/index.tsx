/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { useForm } from "react-hook-form";
import BackendError from "@/utils/BackendError";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormTextInput from "../FormTextInput";
import LoadingButton from "@mui/lab/LoadingButton";
import Message from "../Message";

import type { FC } from "react";
import type { Props as IMessage } from "../Message";
import type { SubmitHandler } from "react-hook-form";

interface Inputs {
  password: string;
  confirmPassword: string;
}

interface Props {
  jwt: string;
  handleCloseModal: () => void;
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

const ChangeUserPassword: FC<Props> = ({ jwt, handleCloseModal }) => {
  const { control, handleSubmit, setError } = useForm<Inputs>();
  const [message, setMessage] = useState<IMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (data.password === data.confirmPassword) {
        setError("password", { message: "A nova senha não pode ser igual a anterior." });
      }
      setIsLoading(true);

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
          ALTERAR SENHA
        </Typography>
        <Box sx={{ width: "100%" }}>
          <FormTextInput
            name="password"
            control={control}
            label="Nova senha"
            type="password"
            rules={inputRules}
            disabled={isLoading}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <FormTextInput
            name="confirmPassword"
            control={control}
            label="Confirme a senha"
            type="password"
            rules={inputRules}
            disabled={isLoading}
          />
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

export default ChangeUserPassword;
