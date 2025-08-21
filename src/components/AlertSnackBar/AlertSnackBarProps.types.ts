export interface AlertSnackBarProps {
    autoHideDuration?: number;
    message: string;
    onClose?: () => void;
    open: boolean;
    severity?: "error" | "info" | "success" | "warning";
}
