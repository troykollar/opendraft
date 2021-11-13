import type {
  FunctionComponent,
  MouseEventHandler,
  FormEventHandler,
} from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Avatar,
  Button,
  Grid,
  Link,
  Switch,
  FormControlLabel,
  Collapse,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { signIn, signUp } from "lib/firebase/auth";
import LoginErrorSnackbar from "./LoginErrorSnackBar";
interface LoginFormProps {}

const LoginForm: FunctionComponent<LoginFormProps> = ({}) => {
  const [email, setEmail] = useState(null as string | null);
  const [password, setPassword] = useState(null as string | null);
  const [confirmPassword, setConfirmPassword] = useState(null as string | null);
  const [username, setUsername] = useState(null as string | null);
  const [errCode, setErrCode] = useState(null as string | null);
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (errCode) timeout = setTimeout(() => setErrCode(null), 5000);

    const clear = () => {
      if (timeout) clearTimeout(timeout);
    };
    return clear;
  }, [errCode]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!newUser) {
      if (email && password) {
        try {
          await signIn(email, password);
        } catch (err: any) {
          setErrCode(String(err.code));
        }
      }
    } else {
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
    }
  };
  return (
    <Container component="main" maxWidth="xs">
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
          {newUser ? "Sign up" : "Sign in"}
        </Typography>

        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                required
                fullWidth
                label="Password"
                name="password"
                autoComplete="password"
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginTop: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Collapse in={newUser}>
                <TextField
                  type="password"
                  fullWidth
                  required={newUser}
                  label="Confirm Password"
                  autoComplete="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ marginTop: 2 }}
                />
              </Collapse>
            </Grid>

            <Grid item xs={12}>
              <Collapse in={newUser}>
                <TextField
                  type="username"
                  fullWidth
                  required={newUser}
                  label="Username"
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{ marginTop: 2 }}
                />
              </Collapse>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {newUser ? "Sign Up" : "Sign In"}
              </Button>
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch onChange={(e) => setNewUser(e.target.checked)} />
                }
                label="New User"
              />
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Link
                onClick={() => console.log("forgot password")}
                variant="body2"
              >
                {"Forgot Password?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <LoginErrorSnackbar errCode={errCode} />
    </Container>
  );
};

export default LoginForm;
