import { User } from "firebase/auth";
import { FunctionComponent, useContext } from "react";
import { UserContext } from "lib/context/UserContext";
import {
  Container,
  Box,
  Paper,
  Grid,
  Typography,
  Divider,
} from "@mui/material";

interface AccountInfoCardProps {}

const AccountInfoCard: FunctionComponent<AccountInfoCardProps> = () => {
  const { user } = useContext(UserContext);
  return (
    <Container maxWidth="sm">
      <Paper sx={{ padding: "32px" }}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Email
                </Typography>
              </Grid>
              <Grid item xs={10} sx={{ wordWrap: "break-word" }}>
                <Typography variant="h6">{user && user.email}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AccountInfoCard;
