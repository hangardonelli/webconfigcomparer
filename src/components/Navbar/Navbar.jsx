import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  color: "white",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#8e7fa150",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function NavBar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const handleClose = () => {
    setOpen(true);
    console.log(open);
  };
  return (
    <Box sx={{ paddingTop: 4 }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={16}>
          <Button onClick={handleOpen}>
            HOW TO USE
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  How to use
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Drag and drop your app.config or web.config files into the
                  boxes. You can select only one, but you will not be able to
                  compare it.
                  <br />
                  <br />

                  <br />
                  The entire process runs on the client. Your config file and enviroment is secured.
                  <br />
                  
                  <br />
                  Made by Lautaro Conde with React - 2022
                </Typography>
              </Box>
            </Modal>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
