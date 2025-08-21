import { toast } from "react-toastify";

export const toastEnums = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    INFO: "info",
};

const displayToast = (status:string, message:string) => {
    if (!Boolean(message)) return;

    switch (status) {
    case "success": {
        toast.success(message);
        return;
    }
    case "error": {
        toast.error(message);
        return;
    }
    case "info": {
        toast.info(message);
        return;
    }
    case "warning": {
        toast.warning(message);
        return;
    }
    }
};

export default displayToast;
