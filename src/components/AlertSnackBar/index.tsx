import Grow, { type GrowProps } from "@mui/material/Grow";

import Alert from "@mui/material/Alert";
import type { AlertSnackBarProps } from "./AlertSnackBarProps.types";
import React from "react";
import Snackbar from "@mui/material/Snackbar";

const GrowTransition = (props: GrowProps) => {
    return <Grow {...props}/>;
};

const FXAlertSnackBar: React.FC<AlertSnackBarProps> = ({
    message,
    onClose,
    open,
    autoHideDuration,
    severity,
}) => {
    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") return;

        if (typeof onClose !== "undefined") onClose();
    };

    return (
        <>
            <Snackbar
                autoHideDuration={autoHideDuration ?? 5000}
                anchorOrigin={{
                    "horizontal": "right",
                    "vertical": "bottom",
                }}  
                open={open}
                onClose={handleClose}
                TransitionComponent={GrowTransition}
            >
                <Alert
                    variant="standard"
                    severity={severity ?? "info"}
                    onClose={handleClose}
                    sx={{ "width": "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default FXAlertSnackBar;
