import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


export default function Culture(props) {
  let rows = [];
  if (props.culture.culture) {
    
    rows = [props.culture.culture];
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
          <TableHead></TableHead>
          <TableBody>
            <TableRow hover role="checkbox" tabIndex={-1} key={-1}>
              <TableCell key={-2}>
                <b>Culture</b>
              </TableCell>
              <TableCell key={-1}>
                <b>UI</b>
              </TableCell>
            </TableRow>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .filter((r) => r != undefined)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell key={1}>
                      {props.culture != "" ? (
                        props.culture.culture.value
                      ) : (
                        <i>empty</i>
                      )}
                    </TableCell>
                    <TableCell key={1}>
                      {props.culture != "" ? (
                        props.culture.culture.uiculture
                      ) : (
                        <i>empty</i>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
