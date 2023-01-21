/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";
import { useGetTransactionsQuery } from "../../state/api";
import Header from "../../components/Header";

function Transactions() {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

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
      <Header title="TRANSACTIONS" subtitle="See your list of transactions" />
      <Box
        height="80vh"
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
        mt="20px"
        pb="20px"
      >
        <DataGrid
          loading={isLoading || !data}
          rows={(data && data.transactions) || []}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          getRowId={(row) => row._id}
          columns={columns}
          pagination
          paginationMode="server"
          page={page}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          sortingMode="server"
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{
            Toolbar: DataGridCustomToolbar,
          }}
          componentsProps={{ toolbar: { searchInput, setSearchInput, setSearch } }}
        />
      </Box>
    </Box>
  );
}

export default Transactions;
