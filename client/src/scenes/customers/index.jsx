/* eslint-disable no-underscore-dangle */
import React from "react";
import { Box, useTheme, } from "@mui/material";
import { DataGrid, } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useGetCustomersQuery, } from "../../state/api";

const columns = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 0.5,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 0.5,
    renderCell: (params,) => params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3",),
  },
  {
    field: "country",
    headerName: "Country",
    flex: 0.4,
  },
  {
    field: "occupation",
    headerName: "Occupation",
    flex: 1,
  },
];

function Customers() {
  const theme = useTheme();
  const { data, isLoading, } = useGetCustomersQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="See your list of customers" />
      {data || !isLoading ? (
        <Box mt="20px" height="75vh" pb="20px">
          <DataGrid
            loading={!data || isLoading}
            getRowId={(row,) => row._id}
            rows={data || []}
            columns={columns}
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
          />
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
}

export default Customers;
