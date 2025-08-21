import { useState, useEffect } from "react";
import {
  Paper,
  TextField,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

export type SortOrder = "asc" | "desc";

export interface Filters {
  search: string;
  sortOrder: SortOrder;
}

interface Props {
  value: Filters;
  onChange: (next: Filters) => void;
}

const FilterBar: React.FC<Props> = ({ value, onChange }) => {
  const [local, setLocal] = useState<Filters>(value);

  // small debounce for typing
  useEffect(() => {
    const id = setTimeout(() => onChange(local), 200);
    return () => clearTimeout(id);
  }, [local, onChange]);

  return (
    <Paper sx={{ p: 2, mb: 2, display: "flex", gap: 4 }}>
      <TextField
        label="Search by name"
        value={local.search}
        onChange={(e) => setLocal({ ...local, search: e.target.value })}
        fullWidth
      />

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ToggleButtonGroup
          exclusive
          value={local.sortOrder}
          onChange={(_, v) => v && setLocal({ ...local, sortOrder: v })}
          size="small"
        >
          <ToggleButton value="asc">Asc</ToggleButton>
          <ToggleButton value="desc">Desc</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Paper>
  );
};

export default FilterBar;
