"use client";
import {
  AddCircle,
  Delete,
  Download,
  Edit,
  Visibility,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const TableCom = ({
  title,
  rows,
  columns,
  disableColumnMenu = true,
  disableColumnFilter = true,
  disableColumnSelector = true,
  disableColumnSorting = true,
  loading = false,
  actions,
  handleView,
  handleEdit,
  handleAdd,
  handleDownload,
  handleDelete,
  testId,
  maxHeight = "682px",
}: any) => {
  const StyledDataGrid = styled(DataGrid)(() => ({
    border: 0,
    "& .MuiDataGrid-main": {
      boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.25)",
      marginLeft: "5px",
      marginRight: "5px",
      marginBottom: "5px",
      borderRadius: "10px",
    },
    "& .MuiDataGrid-columnHeaders": {
      minHeight: 34,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
    },
    "& .MuiDataGrid-container--top [role=row], & .MuiDataGrid-container--bottom [role=row]":
      {
        background: "#AFD3FF",
      },
    "& .MuiDataGrid-columnHeader": {
      borderLeft: "1px solid #C1C1C1",
      "&:nth-of-type(1)": {
        borderLeft: "none",
      },
    },
    "& .MuiDataGrid-columnSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-footerContainer": {
      border: "none",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: 600,
      fontSize: "20px",
      minHeight: "34px",
    },
    "& .MuiDataGrid-row:nth-of-type(even)": {
      backgroundColor: "aliceblue",
    },
    "& .MuiDataGrid-cell": {
      fontWeight: 400,
      padding: "20px 10px",
      fontSize: "16px",
      alignItems: "center",
      display: "flex",
      borderBottom: "none",
    },
    "& .MuiDataGrid-row:last-child": {
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
  }));

  const determineWidth = (actions: any) => {
    const actionCount =
      (actions.view ? 1 : 0) +
      (actions.edit ? 1 : 0) +
      (actions.delete ? 1 : 0);
    switch (actionCount) {
      case 1:
        return 100;
      case 2:
        return 140;
      case 3:
        return 180;
      case 4:
        return 220;
      default:
        return 100;
    }
  };

  const ActionMenu = {
    field: "action",
    headerName: "Action",
    get maxWidth() {
      return determineWidth(actions);
    },
    get minWidth() {
      return determineWidth(actions);
    },
    flex: 1,
    sortable: false,
    align: "center",
    alignItems: "center",
    headerAlign: "center",
    renderCell: ({ row }: any) =>
      loading ? (
        "Loading"
      ) : (
        <Stack spacing={1} direction="row" alignItems="center" display="flex">
          {actions?.view && (
            <IconButton onClick={() => handleView(row)}>
              <Visibility />
            </IconButton>
          )}
          {actions?.edit && (
            <IconButton onClick={() => handleEdit(row)}>
              <Edit sx={{ color: "#32BEA6" }} />
            </IconButton>
          )}
          {actions?.delete && (
            <IconButton onClick={() => handleDelete(row)}>
              <Delete color="error" />
            </IconButton>
          )}
        </Stack>
      ),
  };

  return (
    <Grid container data-testid={testId} spacing={2}>
      {(title || actions?.search || actions?.add) && (
        <Grid item xs={12}>
          <Grid
            container
            spacing={1}
            justifyContent={{
              xs: "left",
              sm: "space-between",
            }}
            alignItems="center"
            mb={1}
          >
            <Grid item>
              <Typography fontSize={25} fontWeight={700}>
                {title}
              </Typography>
            </Grid>
            <Grid width={{ xs: "100%", sm: "100%", md: "auto" }} item>
              <Stack
                width={{ xs: "100%", sm: "100%", md: "auto" }}
                direction={{ xs: "column", sm: "column", md: "row" }}
                spacing="20px"
              >
                {/* {!!actions?.customButton?.length && (
                  <>
                    {actions?.customButton?.map((val: any, idx: number) => {
                      if (val.show) {
                        return (
                          <Button
                            key={`${idx}-button-custom`}
                            size="small"
                            sx={{
                              minWidth: "137px",
                              height: { xs: "40px", sm: "40px", md: "unset" },
                              borderRadius: "5px",
                              color: "#ffffff",
                            }}
                            onClick={val.handleClick}
                            variant="contained"
                            color="secondary"
                          >
                            {val.text}
                          </Button>
                        );
                      }
                      return true;
                    })}
                  </>
                )} */}
                {actions?.download && (
                  <Button
                    size="small"
                    sx={{
                      minWidth: "137px",
                      height: { xs: "40px", sm: "40px", md: "unset" },
                      borderRadius: "5px",
                      color: "#ffffff",
                    }}
                    onClick={handleDownload}
                    variant="contained"
                    color="success"
                    endIcon={<Download />}
                  >
                    Download
                  </Button>
                )}
                {actions?.add && (
                  <Button
                    size="small"
                    aria-busy={false}
                    sx={{
                      minWidth: "137px",
                      height: { xs: "40px", sm: "40px", md: "unset" },
                      borderRadius: "5px",
                      color: "#ffffff",
                    }}
                    onClick={handleAdd}
                    variant="contained"
                    type="button"
                    endIcon={<AddCircle />}
                  >
                    Add Data
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid item xs={12}>
        <Box
          sx={{
            width: "100%",
            height: maxHeight,
            overflowY: "auto",
          }}
        >
          <StyledDataGrid
            autoHeight={rows.length < 5}
            getRowHeight={() => "auto"}
            rows={rows}
            columns={actions?.show ? [...columns, ActionMenu] : columns}
            checkboxSelection={false}
            // hideFooter={hideFooter}
            disableColumnMenu={disableColumnMenu}
            disableColumnFilter={disableColumnFilter}
            disableColumnSelector={disableColumnSelector}
            disableColumnSorting={disableColumnSorting}
            loading={loading}
            pageSizeOptions={[10, 25, 50, 100]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            // components={{
            //   Pagination: (paginationProps) => (
            //     <Pagination
            //       {...paginationProps}
            //       page={pageNo}
            //       count={Math.ceil(total / pageSize)}
            //       onChange={(e, value) => {
            //         onChangePage(e, value);
            //       }}
            //       variant="outlined"
            //       shape="rounded"
            //     />
            //   ),
            // }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default TableCom;
