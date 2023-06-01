import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ onChange }) {
  const [value, setValue] = React.useState("0");
  
  const handleChange = (event) => {
    setValue(event.target.value)
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 170, marginLeft: 5 }}>
      <FormControl fullWidth>
        <Select
          value={value}
          onChange={handleChange}
        >
          <MenuItem value={"0"}>Все продукты</MenuItem>
          <MenuItem value={"1"}>Продукт 1</MenuItem>
          <MenuItem value={"2"}>Продукт 2</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
