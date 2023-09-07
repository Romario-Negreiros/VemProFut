"use client";

import { useState } from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import type { FC, HTMLInputTypeAttribute } from "react";
import type { Control, RegisterOptions } from "react-hook-form";
import type { InputBaseComponentProps } from "@mui/material";

interface Props {
  name: string;
  control: Control<any, any>;
  rules?: RegisterOptions;
  type?: HTMLInputTypeAttribute;
  label?: string;
  disabled?: boolean;
  inputProps?: InputBaseComponentProps;
}

const FormTextInput: FC<Props> = ({ name, control, type, label, rules, disabled, inputProps }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, ref }, fieldState: { error } }) => (
        <TextField
          onBlur={onBlur}
          onChange={onChange}
          inputRef={ref}
          error={!(error === undefined)}
          helperText={error?.message}
          variant="filled"
          type={type === "password" ? (isVisible ? "text" : "password") : type}
          label={label}
          disabled={disabled}
          InputProps={{
            endAdornment:
              type === "password" ? (
                <InputAdornment position="end">
                  <IconButton onClick={() => setIsVisible(!isVisible)}>
                    {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ) : undefined,
          }}
          inputProps={inputProps}
          fullWidth
        />
      )}
    />
  );
};

export default FormTextInput;
