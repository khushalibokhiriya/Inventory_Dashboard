import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddBoxIcon from "@mui/icons-material/AddBox";

interface DrawerItemsProps {
  selectedMenu: string;
  onSelect: (menu: string) => void;
}

const menuItems = [
  { label: "Inventory", icon: <InventoryIcon /> },
  { label: "Add Product", icon: <AddBoxIcon /> },
];

const DrawerItems: React.FC<DrawerItemsProps> = ({ selectedMenu, onSelect }) => {
  const theme = useTheme();

  return (
    <List sx={{ px: 1 }}>
      {menuItems.map((item) => {
        const isActive = selectedMenu === item.label;

        return (
          <ListItemButton
            key={item.label}
            onClick={() => onSelect(item.label)}
            sx={{
              mb: 1,
              borderRadius: 2,
              backgroundColor: isActive
                ? theme.palette.primary.main
                : "transparent",
              color: isActive
                ? theme.palette.primary.contrastText
                : theme.palette.text.primary,
              "&:hover": {
                backgroundColor: isActive
                  ? theme.palette.primary.dark
                  : theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: isActive
                  ? theme.palette.primary.contrastText
                  : theme.palette.text.secondary,
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: isActive ? "bold" : "normal",
              }}
            />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default DrawerItems;
