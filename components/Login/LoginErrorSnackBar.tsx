import { useEffect, useState } from "react";
import type { FunctionComponent } from "react";
import { Alert, Snackbar } from "@mui/material";

interface LoginErrorSnackbarProps {
  errCode: string | null;
}

function getErrorMessage(errCode: string) {
  switch (errCode) {
    case "auth/invalid-email":
      return "Invalid Email";
    case "auth/user-not-found":
      return "Account does not exist for this email";
    case "auth/wrong-password":
      return "Incorrect Password";
    case "auth/internal-error":
      return "Internal error. Try again later.";
    case "auth/invalid-password":
      return "Password must contain at least six characters";
    case "auth/email-already-in-use":
      return "An account already exists for this email";
    default:
      return errCode;
  }
}

const LoginErrorSnackbar: FunctionComponent<LoginErrorSnackbarProps> = ({
  errCode,
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (errCode) setOpen(true);
    else setOpen(false);
  }, [errCode]);

  return (
    <>
      {errCode && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        >
          <Alert severity="error" color="error" variant="filled">
            {getErrorMessage(errCode)}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default LoginErrorSnackbar;
