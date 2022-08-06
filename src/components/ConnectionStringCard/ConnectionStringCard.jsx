import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./ConnectionStringCard.css";
import Snackbar from "@mui/material/Snackbar";

export default function ConnectionStringCard(props) {
  const [open, setOpen] = React.useState(false);

  const handleCopy = () => {
    setOpen(true);
    navigator.clipboard.writeText(props.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Card sx={{ minWidth: 200, maxWidth: 350, minHeight: 400 }}>
      <CardContent className="">
        <CardActions>
          <div>
            <Button sx={{color:"#4c53a1"}} onClick={handleCopy} size="small">
              Copy
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={1000}
              onClose={handleClose}
              message="Copied"
            />
          </div>
        </CardActions>
        <Typography variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Provider: {props.providerName}
        </Typography>
        <Typography
          variant="body2"
          style={{ wordWrap: "break-word" }}
          className="wrap"
        >
          <code style={{backgroundColor:'lightgray'}}>
          {props.value}
          </code>
        </Typography>
      </CardContent>
    </Card>
  );
}
