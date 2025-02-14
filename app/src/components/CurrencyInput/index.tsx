import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Box, FormHelperText, InputLabel, OutlinedInput } from "@mui/material";
import LabelTooltip from "../LabelTooltip";
import { formatCurrency } from "../../utils/string";

interface CurrencyInputProps {
    name: string;
    control: any;
    error?: string;
    rules?: object;
    disabled?: boolean;
    label?: string;
    tooltip?: string;
    fullWidth?: boolean;
    prefix?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
    name,
    control,
    error,
    rules,
    disabled = false,
    fullWidth = true,
    label,
    tooltip,
}) => {
    return (
        <Box>
            {label && (
                <Box display="flex" alignItems="center">
                    <InputLabel disabled={disabled} htmlFor={name}>{label}</InputLabel>
                    {tooltip && <LabelTooltip text={tooltip} disabled={disabled} />}
                </Box>
            )}
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => {
                    useEffect(() => {
                        if (value !== undefined) {
                            onChange(formatCurrency(value));
                        }
                    }, [value]);

                    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                        const rawValue = event.target.value.replace(/\D/g, "");
                        onChange(formatCurrency(rawValue));
                    };

                    return (
                        <>
                            <OutlinedInput
                                id={name}
                                value={value || ""}
                                onChange={handleChange}
                                onBlur={onBlur}
                                fullWidth={fullWidth}
                                error={!!error}
                                disabled={disabled}
                            />
                            {error && <FormHelperText error>{error}</FormHelperText>}
                        </>
                    );
                }}
            />
        </Box>
    );
};

export default CurrencyInput;
