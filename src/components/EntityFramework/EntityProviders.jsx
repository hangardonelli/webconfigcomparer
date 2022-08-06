import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function EntityProviders(props) {


  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Providers</b>
              <br />
              
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ textAlign: "left" }}>
          {props.providers.entityFrameworkProviders.map((r, i) => (
            <div style={{ padding: 10 }}>
              <b>Value: </b>
              {r.value}
              <br />
              <b>Type: </b>
              {r.providerType}
              <br />
            </div>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
