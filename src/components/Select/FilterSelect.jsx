import * as React from "react";
import { filters } from "../../constants/constants";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FilterSelect({ filterId, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 170, marginLeft: 5 }}>
      <FormControl fullWidth>
        <Select
          value={filterId}
          onChange={handleChange}
        >
          {filters.map(({ label, id }) => (
            <MenuItem key={id} value={id}>{label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
