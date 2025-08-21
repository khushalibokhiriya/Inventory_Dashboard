import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Typography,
  TextField,
  Tooltip,
  Box,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useState } from "react";
import type { Product } from "../../interfaces/Product";
import { useDispatch, useSelector } from "react-redux";
import { getInventoryData } from "../../Redux/GetProduct/Action";
import { updateInventoryData } from "../../Redux/UpdateProduct/Action";
import { deleteInventoryData } from "../../Redux/DeleteProduct/Action";
import FilterBar, { type Filters } from "../FilterBar";
import { initialAlertSnackBarContext, type AlertSnackBarContext } from "../../interfaces/AlertSnackBarContext.types";
import AlertSnackBar from "../AlertSnackBar";
import Loader from "../CircularProgress";

const ProductList = () => {
  const { getInventoryResponse, isGetInventoryError, isGetInventoryLoading } = useSelector((state: any) => state.getInventory);
  const [isLoading, setIsLoading] = useState(false);

  const products = Array.isArray(getInventoryResponse)
    ? getInventoryResponse
    : getInventoryResponse
    ? [getInventoryResponse]
    : [];

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editQuantity, setEditQuantity] = useState(0);
  const [alertSnackBarContext, setAlertSnackBarContext] = useState<AlertSnackBarContext>(initialAlertSnackBarContext);

  const [filters, setFilters] = useState<Filters>({
    search: "",
    sortOrder: "asc",
  });

  const theme = useTheme();
  const dispatch = useDispatch();

  function delay(ms: number | undefined) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditQuantity(product.quantity);
  };

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);
      await delay(500);
      
      const response = await dispatch(deleteInventoryData(id)).unwrap();
      setAlertSnackBarContext({
        open: true,
        message: response.message || "Product Deleted successfully!",
        severity: "success",
      });

      setIsLoading(false);
    } catch (error: any) {
      setAlertSnackBarContext({
        open: true,
        message: error?.error || "Something went wrong!",
        severity: "error",
      });
    }
  };

  const handleSave = async (id: number) => {
    try {
      setIsLoading(true);
      await delay(500);

      const response = await dispatch(updateInventoryData({id, data: { name: editName, quantity: editQuantity } }));

      setAlertSnackBarContext({
        open: true,
        message: response.message || "Product Updated successfully!",
        severity: "success",
      });

      setEditingId(null);
      setIsLoading(false);

    } catch (error: any) {
      setAlertSnackBarContext({
        open: true,
        message: error?.error || "Something went wrong!",
        severity: "error",
      });
    }
  };

  const getData = async () => {
     try {
      setIsLoading(true);
      await delay(500);

      const response = await dispatch(getInventoryData(filters));

      setAlertSnackBarContext({
        open: true,
        message: response.message || "Products fetched successfully!",
        severity: "success",
      });

      setIsLoading(false);
     } catch (error: any){
        setAlertSnackBarContext({
          open: true,
          message: error?.error || "Something went wrong!",
          severity: "error",
      });
     }
  }

  useEffect(() => {
    getData();
  }, [dispatch, filters]);

  return (
    <>
      <FilterBar value={filters} onChange={setFilters} />

      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          borderRadius: 3,
          boxShadow: 3,
          overflow: "hidden",
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            p: 2,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          <Typography variant="h6">📦 Product Inventory</Typography>
        </Box>

        <Table stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                bgcolor:
                  theme.palette.mode === "light" ? "grey.100" : "grey.900",
                "& th": {
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                },
              }}
            >
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading || isGetInventoryLoading ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Loader />
                </TableCell>
              </TableRow>
            ) : isGetInventoryError ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
                  <Typography color="error">{isGetInventoryError}</Typography>
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
                  <Inventory2OutlinedIcon
                    color="disabled"
                    sx={{ fontSize: 50, mb: 1 }}
                  />
                  <Typography color="text.secondary" variant="subtitle1">
                    No inventory found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product: Product, idx: number) => (
                <TableRow
                  key={product.id}
                  sx={{
                    bgcolor:
                      theme.palette.mode === "light"
                        ? idx % 2 === 0
                          ? "grey.50"
                          : "white"
                        : idx % 2 === 0
                        ? "grey.800"
                        : "grey.900",
                    "&:hover": {
                      bgcolor:
                        theme.palette.mode === "light"
                          ? "grey.100"
                          : "grey.700",
                    },
                    transition: "background 0.3s",
                  }}
                >
                  <TableCell>
                    {editingId === product.id ? (
                      <TextField
                        fullWidth
                        size="small"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      product.name
                    )}
                  </TableCell>

                  <TableCell>
                    {editingId === product.id ? (
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        value={editQuantity}
                        onChange={(e) =>
                          setEditQuantity(Number(e.target.value))
                        }
                      />
                    ) : (
                      product.quantity
                    )}
                  </TableCell>

                  <TableCell align="center">
                    {editingId === product.id ? (
                      <Tooltip title="Save">
                        <IconButton
                          color="success"
                          onClick={() => handleSave(product.id)}
                        >
                          <CheckIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(product)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(product.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

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

export default ProductList;
