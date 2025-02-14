import React from "react";
import { Controller } from "react-hook-form";
import { Box, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import LabelTooltip from "../LabelTooltip";

interface StandardPicklistProps {
    name: string;
    control?: any;
    error?: string;
    rules?: object;
    disabled?: boolean;
    label?: string;
    placeholder?: string;
    tooltip?: string;
    fullWidth?: boolean;
    defaultValue?: string;
    options: { value: string; label: string }[];
}

const StandardPicklist: React.FC<StandardPicklistProps> = ({
    name,
    control,
    error,
    rules,
    disabled = false,
    fullWidth = true,
    label,
    placeholder,
    tooltip,
    defaultValue = "",
    options
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
                            <Select
                                {...field}
                                id={name}
                                fullWidth={fullWidth}
                                error={!!error}
                                disabled={disabled}
                                defaultValue={placeholder}
                            >
                                {options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {error && <FormHelperText error>{error}</FormHelperText>}
                        </>
                    )}
                />
            ) : (
                <>
                    <Select
                        id={name}
                        fullWidth={fullWidth}
                        error={!!error}
                        disabled={disabled}
                        value={defaultValue}
                        readOnly
                    >
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {error && <FormHelperText error>{error}</FormHelperText>}
                </>
            )}
        </Box>
    );
};

export default StandardPicklist;
