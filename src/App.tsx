import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { useThemeContext } from "./theme/ThemeContext";
import DrawerItems from "./components/DrawerItems";

const drawerWidth = 260;

function App() {
  const [selectedMenu, setSelectedMenu] = useState("Inventory");

  const { darkMode, toggleDarkMode } = useThemeContext();

  // Example dummy products
  // const [products, setProducts] = useState<Product[]>([
  //   { id: 1, name: "Apple", quantity: 10 },
  //   { id: 2, name: "Orange", quantity: 5 },
  // ]);

  const drawer = (
  <div>
    <Toolbar>
      <Typography variant="h6" fontWeight="bold" sx={{ color: "#00ADB5" }}>
        Inventory Dashboard
      </Typography>
    </Toolbar>

    <Divider />

    <DrawerItems
      selectedMenu={selectedMenu}
      onSelect={(menu) => setSelectedMenu(menu)}
    />
  </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "#00ADB5"
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            {selectedMenu}
          </Typography>

          {/* Theme toggle */}
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? "🌞" : "🌙"}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={"permanent"}
          open={true}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {selectedMenu === "Add Product" && (
          <ProductForm />
        )}
        {selectedMenu === "Inventory" && (
          <ProductList />
        )}
      </Box>
    </Box>
  );
}

export default App;
