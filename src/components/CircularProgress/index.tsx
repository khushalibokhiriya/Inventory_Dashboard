import CircularProgress from "@mui/material/CircularProgress";
import { Grid } from "@mui/material";
import React from "react";

interface LoaderProps {
    fullSize?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ fullSize }) => {
    return (
        <Grid sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: fullSize ? '100vw' : '100%', 
            height: fullSize ? '100vh' : '100%',
        }}
        >
            <CircularProgress />
        </Grid>
    );
};

export default Loader;
