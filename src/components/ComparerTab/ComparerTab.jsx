import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./ComparerTab.css";
import ConfigTabPanel from "../ConfigTabPanel/ConfigTabPanel";
import CompareTable from "../CompareTable/CompareTable";
import Zoom from "@mui/material/Zoom";
import { isValidXML } from "./ComparerTabLogic";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function ComparerTab(props) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [valid, setValid] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  try {
  } catch (ex) {}
  return (
    <Zoom in={true}>
      <Box sx={{ bgcolor: "background.paper", width: "80%" }}>
        <AppBar position="static">
          <Tabs
            value={value}
            sx={{ bgcolor: "#4c53a1",  }}
            onChange={handleChange}
            indicatorColor="#4c53a1"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            {!!props.firstConfig ? (
              <Tab label={props.secondConfig ? "Original" : 'Config file'} {...a11yProps(0)} />
            ) : null}

            {!!props.secondConfig ? (
              <Tab label={props.firstConfig ? "Copy file" : 'Config file'} {...a11yProps(1)} />
            ) : null}

            {!!props.firstConfig && !!props.secondConfig && isValidXML(props.secondConfig)  && isValidXML(props.firstConfig) ? (
              <Tab label="Differences" {...a11yProps(2)} />
            ) : null}
          </Tabs>
        </AppBar>
        <SwipeableViews
          className="tab-text"
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {!!!props.firstConfig  || !isValidXML(props.firstConfig)? (
              <b>Nothing to see here. Did you choosen a VALID config file? 😳</b>
            ) : (
              <ConfigTabPanel config={props.firstConfig} />
            )}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {!!!props.secondConfig  || !isValidXML(props.secondConfig)? (
              <b>Nothing to see here. Did you choosen a VALID config file? 😳</b>
            ) : (
              <ConfigTabPanel config={props.secondConfig} />
            )}
          </TabPanel>
          {!!props.firstConfig && !!props.secondConfig  && isValidXML(props.secondConfig)  && isValidXML(props.firstConfig)? (
            <TabPanel value={value} index={2} dir={theme.direction}>
              <CompareTable
                firstConfig={props.firstConfig}
                secondConfig={props.secondConfig}
              />
            </TabPanel>
          ) : null}
        </SwipeableViews>
      </Box>
    </Zoom>
  );
}
