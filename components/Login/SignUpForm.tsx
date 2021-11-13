import type {
  FunctionComponent,
  MouseEventHandler,
  FormEventHandler,
} from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signUp } from "lib/firebase/auth";
import LoginErrorSnackbar from "components/Login/LoginErrorSnackBar";

interface SignUpFormProps {
  handleSignIn: MouseEventHandler<HTMLAnchorElement>;
}

const SignUpForm: FunctionComponent<SignUpFormProps> = ({ handleSignIn }) => {
  const [username, setUsername] = useState(null as string | null);
  const [email, setEmail] = useState(null as string | null);
  const [password, setPassword] = useState(null as string | null);
  const [confirmPassword, setConfirmPassword] = useState(null as string | null);
  const [errCode, setErrCode] = useState(null as string | null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (errCode) timeout = setTimeout(() => setErrCode(null), 5000);

    const clear = () => {
      if (timeout) clearTimeout(timeout);
    };
    return clear;
  }, [errCode]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!username) {
      setErrCode("Username required");
      return;
    } else if (!email) {
      setErrCode("Email required");
      return;
    } else if (!password) {
      setErrCode("Password required");
      return;
    } else if (password !== confirmPassword) {
      setErrCode("Passwords do not match");
      return;
    } else {
      try {
        await signUp(username, email, password);
      } catch (err: any) {
        console.error(err);
        setErrCode(String(err.code));
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Username"
                name="username"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link onClick={handleSignIn} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <LoginErrorSnackbar errCode={errCode} />
    </Container>
  );
};

export default SignUpForm;
