import {
  FunctionComponent,
  MouseEventHandler,
  FormEventHandler,
  useState,
  useEffect,
} from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Avatar,
  Button,
  Grid,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { signIn } from "lib/firebase/auth";
import LoginErrorSnackbar from "./LoginErrorSnackBar";
interface LoginFormProps {
  handleSignUp: MouseEventHandler<HTMLAnchorElement>;
}

const LoginForm: FunctionComponent<LoginFormProps> = ({ handleSignUp }) => {
  const [email, setEmail] = useState(null as string | null);
  const [password, setPassword] = useState(null as string | null);
  const [errCode, setErrCode] = useState(null as string | null);

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
    if (email && password) {
      try {
        await signIn(email, password);
      } catch (err: any) {
        setErrCode(String(err.code));
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
          Sign in
        </Typography>

        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
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
                margin="normal"
                type="password"
                required
                fullWidth
                label="Password"
                name="password"
                autoComplete="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Link variant="body2">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link onClick={handleSignUp} variant="body2">
                {"Don't have an account? Sign Up"}
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
