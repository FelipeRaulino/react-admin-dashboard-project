/* eslint-disable no-underscore-dangle */
import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { Header, DataGridCustomColumnMenu } from "../../components";
import { useGetUserPerformanceQuery } from "../../state/api";

function Performance() {
  const theme = useTheme();
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);
  console.log(data);

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
      headerName: "CreatedAt",
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getHours()}:${date.getMinutes()}, ${date.toDateString()}`;
        return formattedDate;
      },
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 0.7,
      sortable: false,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    }
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PERFORMANCE" subtitle="See the performance of your affiliates sales" />
      <Box
        mt="20px"
        pb="20px"
        height="75vh"
        sx={{
          "& .Mui-DataGrid-root": {
            border: "none",
          },
          "& .Mui-DataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        {(data && !isLoading)
          ? (
            <DataGrid
              loading={!data || isLoading}
              rows={(data && !isLoading) ? data.sales : []}
              getRowId={(row) => row._id}
              columns={columns}
              components={{
                ColumnMenu: DataGridCustomColumnMenu,
              }}
            />
          ) : <>Loading...</>}
      </Box>
    </Box>
  );
}

export default Performance;
