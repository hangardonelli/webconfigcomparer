import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as Logic from "./AppSettingsTableLogic";

const columns = [
  { id: "key", label: "Key", minWidth: 170 },
  { id: "value", label: "Value", minWidth: 200 },
];

export default function AppSettingsTable(props) {
  let rows = [];
  if (props.appSettings) {
    rows = [...props.appSettings];
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .filter((r) => r != undefined)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : value && value != "" ? (
                            row.key != value && Logic.isPassword(row) ? (
                              <span
                                style={{ backgroundColor: "black" }}
                                onClick={(e) =>
                                  (e.currentTarget.style.backgroundColor =
                                    "white")
                                }
                              >
                                {value}
                              </span>
                            ) : Logic.isUrl(row) && value != row.key ? (
                              <a href={value}>{value}</a>
                            ) : Logic.isBoolean(row) && value != row.key ? (
                              <b
                                style={{
                                  color: row.value === "true" ? "green" : "red",
                                }}
                              >
                                {value}
                              </b>
                            ) : (
                              value
                            )
                          ) : (
                            <i>empty</i>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Keys per page"
      />
    </Paper>
  );
}
