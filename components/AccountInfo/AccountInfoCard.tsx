import { User } from "firebase/auth";
import { FunctionComponent, useContext, useState } from "react";
import { UserContext } from "lib/context/UserContext";
import {
  Container,
  Box,
  Paper,
  Grid,
  Typography,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PwdChangeDialog from "components/AccountInfo/PwdChangeDialog";

interface AccountInfoCardProps {}

const AccountInfoCard: FunctionComponent<AccountInfoCardProps> = () => {
  const { user, userData } = useContext(UserContext);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <>
      <Container maxWidth="sm">
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Email
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ wordWrap: "break-word" }}>
                <Typography variant="h6">{user && user.email}</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ margin: "16px 0px 16px 0px" }} />
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Username
                </Typography>
              </Grid>
              <Grid item xs={8} sx={{ wordWrap: "break-word" }}>
                <Typography variant="h6">
                  {userData && userData.username}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Divider sx={{ margin: "16px 0px 16px 0px" }} />
            <Grid container>
              <Grid item xs={8}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Password
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Button
                  onClick={() => setShowChangePassword(true)}
                  variant="contained"
                >
                  Change
                </Button>
              </Grid>
            </Grid>
            <Divider sx={{ margin: "16px 0px 16px 0px" }} />
            <Grid container>
              <Grid item xs={8}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Delete Account
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Button variant="contained" color="error">
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <PwdChangeDialog
        open={showChangePassword}
        handleClose={() => setShowChangePassword(false)}
      />
    </>
  );
};

export default AccountInfoCard;
