export interface AlertSnackBarContext {
    message: string;
    open: boolean;
    severity: "error" | "info" | "success" | "warning";
}

export const initialAlertSnackBarContext: AlertSnackBarContext = {
    "message": "",
    "open": false,
    "severity": "info"
};
