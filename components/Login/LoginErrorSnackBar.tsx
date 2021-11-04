import { FunctionComponent, useEffect, useState } from "react";
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
        <Snackbar open={open} autoHideDuration={6000} sx={{ width: "100%" }}>
          <Alert severity="error" sx={{ width: "95%" }}>
            {getErrorMessage(errCode)}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default LoginErrorSnackbar;
