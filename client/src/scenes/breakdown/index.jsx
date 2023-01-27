import React from "react";
import { Box } from "@mui/material";
import { BreakdownChart, Header } from "../../components";

function Breakdown() {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BREAKDOWN" subtitle="Breakdown of sales per category" />
      <Box mt="20px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
}

export default Breakdown;
