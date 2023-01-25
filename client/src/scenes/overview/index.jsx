import {
  Box, FormControl, InputLabel, MenuItem, Select,
} from "@mui/material";
import React, { useState } from "react";
import { Header, OverviewChart } from "../../components/index";

function Overview() {
  const [view, setView] = useState("units");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="OVERVIEW" subtitle="See a chart with an overview of sales" />
      <Box height="75vh">
        <FormControl sx={{ mt: "20px" }}>
          <InputLabel>View</InputLabel>
          <Select value={view} label="View" onChange={(e) => setView(e.target.value)}>
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
}

export default Overview;
