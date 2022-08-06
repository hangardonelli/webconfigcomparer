import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import {
  XMLToJSON,
  getAppSettings,
  getConnectionStrings,
  getBasicHttpBindings,
  getCulture,
  getAuthenticationMode,
  getCompilationTargetFramework,
  getCompilationDebug,
  getHttpRuntimeTargetFramework,
  getHttpRuntimeExcecutionTimeout,
  getPagesEnableSessionState,
  getHttpModules,
  getWebServerModules,
  getWebServerHandlers,
  getWebServerValidations,
  getDependentAssembly,
  getCodeDOMCompilers,
  getEntityFrameworkDefaultConnectionFactory,
  getEntityFrameworkProviders,
} from "../ConfigTabPanel/ConfigTabPanelLogic";
import { deleteXMLComments, normalizeTags } from "../../utils/xmlHelper";
import { findDifferences } from "../../utils/findDifferences";
let rows = [];
const columns = [
  { id: "key", label: "Key in Config #1", minWidth: 20, maxWidth: 20 },
  { id: "config1", label: "Value in Config #1", minWidth: 200 },
  { id: "config2", label: "Value in Config #2", minWidth: 200 },
];

//const rows = [createData("TiposCuenta", "Cuenta Corriente", "testing", "2")];

export default function CompareTable(props) {
  let rowsConfig1 = [];
  let rowsConfig2 = [];


  if (props.firstConfig) {
    let xmlObj1 = XMLToJSON(
      normalizeTags(deleteXMLComments(props.firstConfig))
    );
    let appSettings1 = getAppSettings(xmlObj1);
    let connectionStrings1 = getConnectionStrings(xmlObj1);
    let basicHttpBindings1 = getBasicHttpBindings(xmlObj1);
    let culture1 = getCulture(xmlObj1);
    let authenticationMode1 = getAuthenticationMode(xmlObj1);
    let compilationTargetFramework1 = getCompilationTargetFramework(xmlObj1);
    let compilationDebug1 = getCompilationDebug(xmlObj1);
    let httpRuntimeTargetFramework1 = getHttpRuntimeTargetFramework(xmlObj1);
    let httpRuntimeExecutionTimeout1 = getHttpRuntimeExcecutionTimeout(xmlObj1);
    let enableSessionState1 = getPagesEnableSessionState(xmlObj1);
    let httpModules1 = getHttpModules(xmlObj1);
    let webServerModules1 = getWebServerModules(xmlObj1);
    let webServerHandlers1 = getWebServerHandlers(xmlObj1);
    let webServerValidations1 = getWebServerValidations(xmlObj1);
    let dependentAssembly1 = getDependentAssembly(xmlObj1);
    let codeDOMCompilers1 = getCodeDOMCompilers(xmlObj1);
    let entityFrameworkDefaultConnectionFactory1 =
      getEntityFrameworkDefaultConnectionFactory(xmlObj1);
    let entityFrameworkProviders1 = getEntityFrameworkProviders(xmlObj1);
    rowsConfig1 = [
      ...connectionStrings1,
      ...appSettings1,
      ...basicHttpBindings1,
      ...authenticationMode1,
      ...httpRuntimeTargetFramework1,
      ...httpRuntimeExecutionTimeout1,
      ...enableSessionState1,
      ...httpModules1,
      ...webServerModules1,
      ...webServerHandlers1,
      ...webServerValidations1,
      ...dependentAssembly1,
      ...codeDOMCompilers1,
      ...entityFrameworkProviders1,
      ...entityFrameworkDefaultConnectionFactory1,
      ...compilationTargetFramework1,
      ...compilationDebug1,
      [culture1],
    ];
  }

  if (props.secondConfig) {
    let xmlObj2 = XMLToJSON(
      normalizeTags(deleteXMLComments(props.secondConfig))
    );
    let appSettings2 = getAppSettings(xmlObj2);
    let connectionStrings2 = getConnectionStrings(xmlObj2);
    let basicHttpBindings2 = getBasicHttpBindings(xmlObj2);
    let culture2 = getCulture(xmlObj2);
    let authenticationMode2 = getAuthenticationMode(xmlObj2);
    let compilationTargetFramework2 = getCompilationTargetFramework(xmlObj2);
    let compilationDebug2 = getCompilationDebug(xmlObj2);
    let httpRuntimeTargetFramework2 = getHttpRuntimeTargetFramework(xmlObj2);
    let httpRuntimeExecutionTimeout2 = getHttpRuntimeExcecutionTimeout(xmlObj2);
    let enableSessionState2 = getPagesEnableSessionState(xmlObj2);
    let httpModules2 = getHttpModules(xmlObj2);
    let webServerModules2 = getWebServerModules(xmlObj2);
    let webServerHandlers2 = getWebServerHandlers(xmlObj2);
    let webServerValidations2 = getWebServerValidations(xmlObj2);
    let dependentAssembly2 = getDependentAssembly(xmlObj2);
    let codeDOMCompilers2 = getCodeDOMCompilers(xmlObj2);
    let entityFrameworkDefaultConnectionFactory2 =
      getEntityFrameworkDefaultConnectionFactory(xmlObj2);
    let entityFrameworkProviders2 = getEntityFrameworkProviders(xmlObj2);
    rowsConfig2 = [
      ...connectionStrings2,
      ...appSettings2,
      ...basicHttpBindings2,
      ...authenticationMode2,
      ...httpRuntimeTargetFramework2,
      ...httpRuntimeExecutionTimeout2,
      ...enableSessionState2,
      ...httpModules2,
      ...webServerModules2,
      ...webServerHandlers2,
      ...webServerValidations2,
      ...dependentAssembly2,
      ...codeDOMCompilers2,
      ...entityFrameworkProviders2,
      ...entityFrameworkDefaultConnectionFactory2,
      ...compilationTargetFramework2,
      ...compilationDebug2,
      [culture2],
    ];
  }

  rows = findDifferences(rowsConfig1, rowsConfig2);

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
                  <b>{column.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                    
                        row.config1 != row.config2 && row.key != "assemblyIdentity" ? 
                        
                        <TableCell key={column.id} align={column.align}>
                              {console.log(row)}
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : value === "NOT_EXISTS" ? (
                            <b style={{ color: "red" }}>Not exists</b>
                          ) : !value || value.length === 0 ? (
                            <b style={{ color: "orange" }}>Empty</b>
                          ) : (
                            value 
                          )}
                        </TableCell> : null
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
