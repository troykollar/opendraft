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
  const [errCode, setErrCode] = useState(null as string | null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!currentPassword) return setErrCode("Current password required");
    else if (!password) return setErrCode("New password required");
    else if (!password) return setErrCode("Confirm new password required");
    else if (password !== confirmPassword)
      return setErrCode("Passwords do not match");
    else {
      setLoading(true);
      try {
        await changePassword(currentPassword, password);
      } catch (err: any) {
        setErrCode(err.code);
      }
      setLoading(false);
      handleClose();
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
                Change Password
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
              label="Current password"
              type="password"
              fullWidth
              variant="outlined"
              sx={{ marginTop: "8px" }}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <TextField
              label="New password"
              type="password"
              fullWidth
              variant="outlined"
              sx={{ marginTop: "16px" }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm new password"
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
      <LoginErrorSnackbar errCode={errCode} />
    </>
  );
};

export default FormDialog;
