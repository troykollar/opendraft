import { User } from "firebase/auth";
import { FunctionComponent, useContext, useState } from "react";
import { UserContext } from "lib/context/UserContext";
import {
  Container,
  Paper,
  Grid,
  Typography,
  Divider,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PwdChangeDialog from "components/AccountInfo/PwdChangeDialog";
import UsernameChangeDialog from "components/AccountInfo/UsernameChangeDialog";
import ConfirmDialog from "components/General/ConfirmDialog";
import DeleteAccountDialog from "./DeleteAccountDialog";

interface AccountInfoCardProps {}

const AccountInfoCard: FunctionComponent<AccountInfoCardProps> = () => {
  const { user, userData } = useContext(UserContext);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeUsername, setShowChangeUsername] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  return (
    <>
      <Container maxWidth="sm" component={Paper} variant="outlined">
        <List>
          <ListItemButton sx={{ padding: 2 }}>
            <Grid container alignItems="center">
              <Grid item sm={4} xs={12}>
                <Typography variant="overline">Email</Typography>
              </Grid>
              <Grid item xs={6}>
                <div>{user && user.email}</div>
              </Grid>
            </Grid>
          </ListItemButton>
          <Divider />
          <ListItemButton
            sx={{ padding: 2 }}
            onClick={() => setShowChangeUsername(true)}
          >
            <Grid container alignItems="center">
              <Grid item sm={4} xs={12}>
                <Typography variant="overline">Username</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{userData && userData.username}</Typography>
              </Grid>
            </Grid>
          </ListItemButton>
          <Divider />
          <ListItemButton
            sx={{ padding: 2 }}
            onClick={() => setShowChangePassword(true)}
          >
            <Grid container alignItems="center">
              <Grid item sm={4} xs={12}>
                <Typography variant="overline">Password</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{"********"}</Typography>
              </Grid>
            </Grid>
          </ListItemButton>
          <Divider />
          <ListItem sx={{ padding: 2 }}>
            <Grid container alignItems="center">
              <Grid item sm={4} xs={12}>
                <Typography variant="overline">Delete Account</Typography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={() => setShowConfirmDelete(true)}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </Container>
      <PwdChangeDialog
        open={showChangePassword}
        handleClose={() => setShowChangePassword(false)}
      />
      <UsernameChangeDialog
        open={showChangeUsername}
        handleClose={() => setShowChangeUsername(false)}
      />
      <DeleteAccountDialog
        open={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
      />
    </>
  );
};

export default AccountInfoCard;
