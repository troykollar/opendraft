import {
  useState,
  FunctionComponent,
  FormEventHandler,
  useEffect,
} from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  CircularProgress,
} from "@mui/material";
import { changePassword } from "lib/firebase/auth";
import LoginErrorSnackbar from "components/Login/LoginErrorSnackBar";
import changeUsername from "lib/functions/changeUsername";

interface PwdChangeDialogProps {
  open: boolean;
  handleClose: () => void;
}

// TODO: Add error handling
const FormDialog: FunctionComponent<PwdChangeDialogProps> = ({
  open,
  handleClose,
}) => {
  const [newUsername, setNewUsername] = useState(null as string | null);
  const [loading, setLoading] = useState(false);
  const [errCode, setErrCode] = useState(null as string | null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!newUsername) return setErrCode("Username required");
    else {
      let success = true;
      setLoading(true);
      try {
        await changeUsername(newUsername);
      } catch (err: any) {
        setErrCode(err.code);
        success = false;
      }
      setLoading(false);
      if (success) handleClose();
    }
  };

  useEffect(() => {
    let errTimeout: ReturnType<typeof setTimeout> | undefined;
    if (errCode) errTimeout = setTimeout(() => setErrCode(null), 5000);

    return () => {
      if (errTimeout) clearTimeout(errTimeout);
    };
  }, [errCode]);
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            <Grid container>
              <Grid item xs={9}>
                Change Username
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {loading && (
                  <CircularProgress
                    size="24px"
                    sx={{ padding: 0, margin: 0 }}
                  />
                )}
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              label="New username"
              type="username"
              fullWidth
              variant="outlined"
              sx={{ marginTop: "8px" }}
              onChange={(e) => setNewUsername(e.target.value)}
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
      <LoginErrorSnackbar errCode={errCode} />
    </>
  );
};

export default FormDialog;
