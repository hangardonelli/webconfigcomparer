import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import "./DnD.css";
import Grid from "@mui/material/Grid";
import ComparerTab from "../ComparerTab/ComparerTab";
import { useState, useEffect } from "react";
import readFile from "../../utils/readFile";
import Zoom from "@mui/material/Zoom";
import Navbar from "../Navbar/Navbar";
const defaultTheme = createTheme();

const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "dashed" },
          style: {
            textTransform: "none",
            border: `2px dashed ${defaultTheme.palette.primary.main}`,
            color: defaultTheme.palette.primary.main,
          },
        },
        {
          props: { variant: "dashed", color: "secondary" },
          style: {
            border: `2px dashed ${defaultTheme.palette.secondary.main}`,
            color: defaultTheme.palette.secondary.main,
          },
        },
        {
          props: { variant: "dashed", size: "large" },
          style: {
            borderWidth: 4,
            fontSize: 25,
          },
        },
        {
          props: { variant: "dashed", color: "secondary", size: "large" },
          style: {
            fontSize: 25,
          },
        },
      ],
    },
  },
});

export default function DnD() {
  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropFirstConfig = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFirstConfig({
      label: "Loading",
      state: "loading",
      filename: null,
      content: null,
    });

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFirstConfig({
        label: "Loaded",
        state: "Loaded",
        file: e.dataTransfer.files[0],
        filename: e.dataTransfer.files[0].name,
        content: await readFile(e),
      });
    }
  };

  const handleDropSecondConfig = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSecondConfig({
      label: "Loading",
      state: "loading",
      filename: null,
      content: null,
    });

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSecondConfig({
        label: "Loaded",
        state: "Loaded",
        file: e.dataTransfer.files[0],
        filename: e.dataTransfer.files[0].name,
        content: await readFile(e),
      });
    }
  };

  const [firstConfig, setFirstConfig] = useState({
    state: "waiting",
    label: "Web Config #1",
    filename: null,
    content: null,
  });

  const [secondConfig, setSecondConfig] = useState({
    state: "waiting",
    label: "Web Config #2",
    filename: null,
    content: null,
  });

  const [configLoaded, setConfigLoaded] = useState(false);

  useEffect(() => {}, [firstConfig, secondConfig, configLoaded]);

  return (
    <ThemeProvider theme={theme}>
  {!configLoaded ?   <Navbar/> : null }
      <Zoom in={true}>
    
        <Grid container spacing={{ xs: 1, md: 0 }} columns={{ md: 8 }}>
        
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            key={1}
            onDrop={handleDropFirstConfig}
            onDragOver={handleOnDragOver}
          >
            {!configLoaded && (
              <>
                <Button
                  variant="dashed"
                  size="large"
                  style={{ backgroundColor: "#000000aa" }}
                  sx={{ m: 1, p: 20 }}
                >
                  <input id="firstConfigFile" type="file" hidden />
                  {firstConfig.label}
                </Button>
                <div className="subtitle-dnd">
                  <br />
                  {firstConfig.state === "waiting" && (
                    <>Drag and drop to the box</>
                  )}
                </div>
              </>
            )}
          </Grid>
          <Grid
            onDrop={handleDropSecondConfig}
            onDragOver={handleOnDragOver}
            xs={2}
            sm={4}
            md={4}
            key={2}
          >
            {!configLoaded && (
              <>
                <Button
                  variant="dashed"
                  size="large"
                  color="secondary"
                  style={{ backgroundColor: "#000000aa" }}
                  sx={{ m: 1, p: 20 }}
                >
                  <input id="firstConfigFile" type="file" hidden />
                  {secondConfig.label}
                </Button>
                <div className="subtitle-dnd">
                  <br />
                  {secondConfig.state === "waiting" && (
                    <>Drag and drop to the box</>
                  )}
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </Zoom>

      {configLoaded && (
        <ComparerTab
          firstConfig={firstConfig.content}
          secondConfig={secondConfig.content}
        />
      )}

      <Zoom in={true}>
        <Button
          style={{ color: "white" }}
          onClick={() => {
            setConfigLoaded(!configLoaded);
          }}
  
        >
          {!configLoaded ? "GO!" : "GO BACK"}
        </Button>
      </Zoom>
    </ThemeProvider>
  );
}
