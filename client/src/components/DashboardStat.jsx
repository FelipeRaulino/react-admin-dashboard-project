import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

function DashboardStat({
  title, icon, value, increase,
}) {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gridColumn="span 2"
      gridRow="span 1"
      backgroundColor={theme.palette.background.alt}
      flex="1 1 100%"
      borderRadius="0.55rem"
      p="1.25rem 1rem"
    >
      <FlexBetween>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>
        {icon}
      </FlexBetween>
      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ color: theme.palette.secondary[200] }}
      >
        {value}
      </Typography>
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}
        >
          {increase}
        </Typography>
        <Typography>Since last month</Typography>
      </FlexBetween>
    </Box>
  );
}

export default DashboardStat;
