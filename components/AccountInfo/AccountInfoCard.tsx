import type { FunctionComponent } from "react";
import { useContext, useState } from "react";
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
import { ChevronRight } from "@mui/icons-material";
import TitledListItem from "components/General/TitledListItem";

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
          <TitledListItem title="Email">{user && user.email}</TitledListItem>
          <Divider />
          <TitledListItem
            title="Username"
            onClick={() => setShowChangeUsername(true)}
          >
            {userData && userData.username}
          </TitledListItem>
          <Divider />
          <TitledListItem
            onClick={() => setShowChangePassword(true)}
            title="Password"
          >
            ********
          </TitledListItem>
          <Divider />
          <TitledListItem title="Delete Account">
            <Button
              onClick={() => setShowConfirmDelete(true)}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </TitledListItem>
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
