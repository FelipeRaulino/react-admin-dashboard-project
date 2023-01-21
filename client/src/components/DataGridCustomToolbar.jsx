import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import {
  GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport,
} from "@mui/x-data-grid";
import React from "react";
import FlexBetween from "./FlexBetween";

function DataGridCustomToolbar({ searchInput, setSearchInput, setSearch }) {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          label="Search..."
          variant="standard"
          sx={{ mb: "0.5rem" }}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setSearch("");
          }}
          value={searchInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearch(searchInput)}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
}

export default DataGridCustomToolbar;
