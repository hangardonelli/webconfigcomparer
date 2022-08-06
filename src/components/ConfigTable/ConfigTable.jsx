import "./ConfigTable.css";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { deleteXMLComments, normalizeTags } from "../../utils/xmlHelper";
import {
  XMLToJSON,
  getBasicHttpBindings,
  getAuthenticationMode,
  getHttpRuntimeTargetFramework,
  getHttpRuntimeExcecutionTimeout,
  getPagesEnableSessionState,
  getHttpModules,
  getWebServerModules,
  getWebServerHandlers,
  getWebServerValidations,
  getDependentAssembly,
  getCodeDOMCompilers,
} from "./ConfigTableLogic";

const columns = [
  { id: "type", label: "Type", minWidth: 120 },
  { id: "key", label: "Key", minWidth: 170 },
  { id: "value", label: "Value", minWidth: 200 },
];



export default function ConfigTable(props) {
  let rows = [];
  if (props.config) {
    let xmlObj = XMLToJSON(normalizeTags(deleteXMLComments(props.config)));
    let basicHttpBindings = getBasicHttpBindings(xmlObj);
    let authenticationMode = getAuthenticationMode(xmlObj);
    let httpRuntimeTargetFramework = getHttpRuntimeTargetFramework(xmlObj);
    let httpRuntimeExecutionTimeout = getHttpRuntimeExcecutionTimeout(xmlObj);
    let enableSessionState = getPagesEnableSessionState(xmlObj);
    let httpModules = getHttpModules(xmlObj);
    let webServerModules = getWebServerModules(xmlObj);
    let webServerHandlers = getWebServerHandlers(xmlObj);
    let webServerValidations = getWebServerValidations(xmlObj);
    let dependentAssembly = getDependentAssembly(xmlObj);
    let codeDOMCompilers = getCodeDOMCompilers(xmlObj);

    rows = [
      ...basicHttpBindings,
      ...authenticationMode,

      ...httpRuntimeTargetFramework,
      ...httpRuntimeExecutionTimeout,
      ...enableSessionState,
      ...httpModules,
      ...webServerModules,
      ...webServerHandlers,
      ...webServerValidations,
      ...dependentAssembly,
      ...codeDOMCompilers,
    ];
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
                        <TableCell
                          sx={{ maxWidth: 10 }}
                          key={column.id}
                          align={column.align}
                        >
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : value && value != "" ? (
                            value.toLowerCase() === "false" ||
                            value.toLowerCase() === "add" ||
                            value.toLowerCase() === "remove" ||
                            value.toLowerCase() === "true" ||
                            value.toLowerCase() === "add" ? (
                              value.toLowerCase() === "true" ||
                              value.toLowerCase() === "add" ? (
                                <b style={{ color: "green" }}>{value}</b>
                              ) : (
                                <b style={{ color: "red" }}>{value}</b>
                              )
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
