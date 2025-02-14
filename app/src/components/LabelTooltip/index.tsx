import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { HelpOutlineOutlined } from "@mui/icons-material";

interface LabelTooltipProps {
    text: string;
    disabled?: boolean;
}


const LabelTooltip: React.FC<LabelTooltipProps> = ({
    text,
    disabled = false,
}) => {
    return (
        <>
            {!disabled && (
                <Tooltip title={text} arrow placement="right">
                    <IconButton size="small" sx={{ transform: "scale(0.8)", margin: 0, padding: 0 }}>
                        <HelpOutlineOutlined />
                    </IconButton>
                </Tooltip>
            )}
        </>
    );
};

export default LabelTooltip;
