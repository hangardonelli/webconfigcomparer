import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ConnectionStringCard from "../ConnectionStringCard/ConnectionStringCard";
import Grid from "@mui/material/Grid";
import { deleteXMLComments, normalizeTags } from "../../utils/xmlHelper";
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
} from "./ConfigTabPanelLogic";
import AppSettingsTable from "../AppSettingTable/AppSettingsTable";
import EntityDefaultConnectionFactory from "../EntityFramework/EntityDefaultConnectionFactory";
import EntityProviders from "../EntityFramework/EntityProviders";
import TargetFrameworkTable from "../TargetFrameworkTable/TargetFrameworkTable";
import CompilationDebugTable from "../CompilationDebugTable/CompilationDebugTable";
import Culture from "../Culture/Culture";
import ConfigTable from "../ConfigTable/ConfigTable";
import useMediaQuery from '@mui/material/useMediaQuery';

let xmlObj;
let appSettings;
let connectionStrings;
let basicHttpBindings;
let culture;
let authenticationMode;
let compilationTargetFramework;
let compilationDebug;
let httpRuntimeTargetFramework;
let httpRuntimeExecutionTimeout;
let enableSessionState;
let httpModules;
let webServerModules;
let webServerHandlers;
let webServerValidations;
let dependentAssembly;
let codeDOMCompilers;
let entityFrameworkDefaultConnectionFactory;
let entityFrameworkProviders;
let rows = [];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ width: 1500 }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function ConfigTabPanel(props) {
  const [value, setValue] = React.useState(0);
  const matches = useMediaQuery('(min-width:600px)');
  if (props.config) {
    xmlObj = XMLToJSON(normalizeTags(deleteXMLComments(props.config)));
    appSettings = getAppSettings(xmlObj);
    connectionStrings = getConnectionStrings(xmlObj);
    basicHttpBindings = getBasicHttpBindings(xmlObj);
    culture = getCulture(xmlObj);
    authenticationMode = getAuthenticationMode(xmlObj);
    compilationTargetFramework = getCompilationTargetFramework(xmlObj);
    compilationDebug = getCompilationDebug(xmlObj);
    httpRuntimeTargetFramework = getHttpRuntimeTargetFramework(xmlObj);
    httpRuntimeExecutionTimeout = getHttpRuntimeExcecutionTimeout(xmlObj);
    enableSessionState = getPagesEnableSessionState(xmlObj);
    httpModules = getHttpModules(xmlObj);
    webServerModules = getWebServerModules(xmlObj);
    webServerHandlers = getWebServerHandlers(xmlObj);
    webServerValidations = getWebServerValidations(xmlObj);
    dependentAssembly = getDependentAssembly(xmlObj);
    codeDOMCompilers = getCodeDOMCompilers(xmlObj);
    entityFrameworkDefaultConnectionFactory =
      getEntityFrameworkDefaultConnectionFactory(xmlObj);
    entityFrameworkProviders = getEntityFrameworkProviders(xmlObj);
    rows = [
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: !matches ? "block" : "flex",
        height: 500,
      }}
    >
      <Tabs
        orientation={!matches ? "horizontal" : "vertical"} 
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        value={value}
        
      
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, color: 'red', borderColor: "divider", width: !matches? 500 : 200 }}
      >
        <Tab label="Connection Strings" {...a11yProps(0)} />
        <Tab label="App Settings" {...a11yProps(1)} />
        <Tab label="Entity Framework" {...a11yProps(2)} />
        <Tab label="Compilation" {...a11yProps(3)} />
        <Tab label="Globalization" {...a11yProps(4)} />
        <Tab label="Other" {...a11yProps(5)} />

      </Tabs>
      <TabPanel value={value} index={0}>
        <Box sx={{}}>
          <Grid container spacing={2} columns={!matches ? 6 : 16}>
            {connectionStrings.map((c, i) => (
              <Grid item xs={8}>
                <ConnectionStringCard
             
                  name={c.key}
                  value={c.value}
                  key={i}
                  providerName={c.providerName}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AppSettingsTable appSettings={appSettings} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EntityDefaultConnectionFactory
          defaultConnections={{ entityFrameworkDefaultConnectionFactory }}
        />

        <br/>

        <EntityProviders providers={{entityFrameworkProviders}}/>
        
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TargetFrameworkTable targetFramework={{compilationTargetFramework}}/>
        <CompilationDebugTable compilationDebug={{compilationDebug}}/>

      </TabPanel>
      <TabPanel value={value} index={4}>
        <Culture culture={{culture}}/>
      </TabPanel>
      <TabPanel value={value} index={5}>
      <ConfigTable config={props.config}/>
      </TabPanel>

    </Box>
  );
}
