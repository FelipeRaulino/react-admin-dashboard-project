/* eslint-disable no-underscore-dangle */
import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Header, DataGridCustomColumnMenu } from "../../components";
import { useGetAdminsQuery } from "../../state/api";

function Admin() {
  const theme = useTheme();
  const { data, isLoading } = useGetAdminsQuery();

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
      renderCell: (params) => params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"),
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
    }
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subtitle="See your list of admins users" />
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
              rows={(data && !isLoading) ? data : []}
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

export default Admin;
