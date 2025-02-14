import React, { useState } from "react";
import { Box, FormHelperText, Input, InputLabel, OutlinedInput } from "@mui/material";
import StandardInput from "../StandardInput";

interface DatePickerProps {
  label: string;
  name: string;
  control: any;
  error?: string;
  rules?: object;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, name, control, error, rules, disabled = false }) => {
  return (
    <Box>
      <InputLabel disabled={disabled} htmlFor={name}>{label}</InputLabel>
      <StandardInput
        name={name}
        control={control}
        rules={rules}
        type={"date"}
        disabled={disabled}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Box>
  );
};


export default DatePicker;
