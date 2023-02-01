/* eslint-disable no-underscore-dangle */
import React from "react";
import {
  Box, Button, Typography, useMediaQuery, useTheme,
} from "@mui/material";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetDashboardQuery } from "../../state/api";
import {
  BreakdownChart, DashboardStat, FlexBetween, Header, OverviewChart,
} from "../../components";

function Dashboard() {
  const theme = useTheme();
  const { data, isLoading } = useGetDashboardQuery();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value);
        const dateFortmatted = `${date.getHours()}:${date.getMinutes()}, ${date.toDateString()}`;
        return dateFortmatted;
      },
    },
    {
      field: "products",
      headerName: "# of products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 0.5,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    }
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="A view of your dashboard" />
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ marginRight: "10px" }} />
            Dowload Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        mt="40px"
        pb="20px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <DashboardStat
          title="Total Customers"
          value={data && data.totalCustomers}
          icon={<Email sx={{ color: theme.palette.secondary[500], fontSize: "26px" }} />}
          increase="+14%"
        />

        <DashboardStat
          title="Sales Today"
          value={data && data.todayStats.totalSales}
          icon={<PointOfSale sx={{ color: theme.palette.secondary[500], fontSize: "26px" }} />}
          increase="+21%"
        />

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard />
        </Box>

        <DashboardStat
          title="Monthly Sales"
          value={data && data.thisMonthStats.totalSales}
          icon={<PersonAdd sx={{ color: theme.palette.secondary[500], fontSize: "26px" }} />}
          increase="+5%"
        />

        <DashboardStat
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          icon={<Traffic sx={{ color: theme.palette.secondary[500], fontSize: "26px" }} />}
          increase="+43%"
        />

        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
        >
          <DataGrid
            loading={isLoading || !data}
            rows={(data && data.transactions) || []}
            getRowId={(row) => row._id}
            columns={columns}
          />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          p="1.5rem"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales by category
          </Typography>
          <BreakdownChart isDashboard />
          <Typography p="1rem 0.6rem" fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>

      </Box>
    </Box>
  );
}

export default Dashboard;
