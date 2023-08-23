import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

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
          type={type}
          label={label}
          disabled={disabled}
          inputProps={inputProps}
          fullWidth
        />
      )}
    />
  );
};

export default FormTextInput;
