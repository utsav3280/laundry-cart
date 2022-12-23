import React from "react";
import StoreLoc from "../StoreLoc";
import "./Style/style.css";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Draggable from "react-draggable";
import Paper from "@mui/material/Paper";
import {
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { width } from "@mui/system";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function Proceed() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open draggable dialog
      </Button>
      <Dialog
        PaperProps={{
          sx: { position: "fixed", top: 0, left: "61%", m: 0 },
        }}
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <div
          style={{
            backgroundColor: "red",
          }}
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Subscribe
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally. Lorem ipsum dolor sit,
              amet consectetur adipisicing elit. Doloremque deleniti,
              praesentium eos consequatur, reiciendis at cumque ratione fuga
              quam rerum facilis, incidunt possimus quis quae dolorem nemo
              laudantium veritatis repellat?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default Proceed;
