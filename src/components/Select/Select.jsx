import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 170, marginLeft: 5 }}>
      <FormControl fullWidth>
        <Select
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={"all"}>Все продукты</MenuItem>
          <MenuItem value={"first"}>Продукт 1</MenuItem>
          <MenuItem value={"second"}>Продукт 2</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
