import { useState } from "react";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import { addInventoryData } from "../../Redux/AddProduct/Action";
import { useDispatch, useSelector } from "react-redux";
import AlertSnackBar from "../AlertSnackBar";
import {
  initialAlertSnackBarContext,
  type AlertSnackBarContext,
} from "../../interfaces/AlertSnackBarContext.types";
import Loader from "../CircularProgress";

const ProductForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [alertSnackBarContext, setAlertSnackBarContext] = useState<AlertSnackBarContext>(initialAlertSnackBarContext);
  const [isLoading, setIsLoading] = useState(false);

  const { isAddInventoryLoading } = useSelector((state: any) => state.addInventory);

  function delay(ms: number | undefined) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleSubmit = async (name: string, quantity: number) => {
    try {
      setIsLoading(true);
      await delay(500);
      const response = await dispatch(
        addInventoryData({ name, quantity })
      ).unwrap();

      setAlertSnackBarContext({
        open: true,
        message: response.message || "Product added successfully!",
        severity: "success",
      });

      // Reset form
      setName("");
      setQuantity(1);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(true);

      setAlertSnackBarContext({
        open: true,
        message: error?.message || "Something went wrong!",
        severity: "error",
      });

      setIsLoading(false);
    }
  };

  return (
    <>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          maxWidth: 420,
          mx: "auto",
          borderRadius: 3,
          boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "text.primary",
          }}
        >
          ➕ Add New Product
        </Typography>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent page reload / browser form submit
            handleSubmit(name, quantity);
          }}
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            fullWidth
            label="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />

          <TextField
            fullWidth
            type="number"
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            variant="outlined"
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 1,
              py: 1.2,
              fontWeight: "bold",
              fontSize: "0.95rem",
              textTransform: "none",
              bgcolor: "#00ADB5",
              "&:hover": { bgcolor: "#0097a2" },
            }}
          >
            {isLoading || isAddInventoryLoading 
            ? (
                <Loader />
              ) 
            :
              ("Add Product")
            }
          </Button>
        </Box>
      </Paper>

      <AlertSnackBar
        message={alertSnackBarContext.message}
        open={alertSnackBarContext.open}
        severity={alertSnackBarContext.severity}
        onClose={() => {
          setAlertSnackBarContext(initialAlertSnackBarContext);
        }}
      />
    </>
  );
};

export default ProductForm;
