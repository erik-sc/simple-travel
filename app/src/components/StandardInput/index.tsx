import React from "react";
import { Controller } from "react-hook-form";
import { Box, FormHelperText, InputLabel, OutlinedInput } from "@mui/material";
import LabelTooltip from "../LabelTooltip";

interface StandardInputProps {
    name: string;
    control?: any;
    error?: string;
    type?: string;
    rules?: object;
    disabled?: boolean;
    label?: string;
    tooltip?: string;
    fullWidth?: boolean;
    defaultValue?: string;
}


const StandardInput: React.FC<StandardInputProps> = ({
    name,
    control,
    type = "text",
    error,
    rules,
    disabled = false,
    fullWidth = true,
    label,
    tooltip,
    defaultValue
}) => {
    return (
        <Box>
            {label && (
                <Box display="flex" alignItems="center">
                    <InputLabel disabled={disabled} htmlFor={name}>{label}</InputLabel>
                    {tooltip && <LabelTooltip text={tooltip} disabled={disabled} />}
                </Box>
            )}
            
            {control ? (
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field }) => (
                        <>
                            <OutlinedInput
                                {...field}
                                id={name}
                                type={type}
                                fullWidth={fullWidth}
                                error={!!error}
                                disabled={disabled}
                            />
                            {error && <FormHelperText error>{error}</FormHelperText>}
                        </>
                    )}
                />
            ) : (
                <>
                    <OutlinedInput
                        id={name}
                        type={type}
                        fullWidth={fullWidth}
                        error={!!error}
                        disabled={disabled}
                        value={defaultValue}
                        readOnly
                    />
                    {error && <FormHelperText error>{error}</FormHelperText>}
                </>
            )}
        </Box>
    );
};

export default StandardInput;
