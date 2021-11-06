import { useState, FunctionComponent, FormEventHandler } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { changePassword } from "lib/firebase/auth";

interface PwdChangeDialogProps {
  open: boolean;
  handleClose: () => void;
}

// TODO: Add error handling
const FormDialog: FunctionComponent<PwdChangeDialogProps> = ({
  open,
  handleClose,
}) => {
  const [currentPassword, setCurrentPassword] = useState(null as string | null);
  const [password, setPassword] = useState(null as string | null);
  const [confirmPassword, setConfirmPassword] = useState(null as string | null);
  const [loading, setLoading] = useState(false);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (
      currentPassword &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      setLoading(true);
      try {
        await changePassword(currentPassword, password);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{loading ? "Loading" : "Change Password"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Current Password"
            type="password"
            fullWidth
            variant="outlined"
            sx={{ marginTop: "8px" }}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            sx={{ marginTop: "16px" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="outlined"
            sx={{ marginTop: "16px" }}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit">Confirm</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialog;
