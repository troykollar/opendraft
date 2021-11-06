import { useState, FunctionComponent, UIEventHandler } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface PwdChangeDialogProps {
  open: boolean;
  handleClose: () => void;
}

// TODO: Hook up PwdChangeDialog to firebase
const FormDialog: FunctionComponent<PwdChangeDialogProps> = ({
  open,
  handleClose,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            sx={{ marginTop: "8px" }}
          />
          <TextField
            autoFocus
            label="Confirm"
            type="password"
            fullWidth
            variant="outlined"
            sx={{ marginTop: "16px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleClose}>
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialog;
