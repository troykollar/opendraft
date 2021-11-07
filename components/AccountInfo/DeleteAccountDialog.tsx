import { FormEventHandler, FunctionComponent, useState } from "react";
import ConfirmDialog from "components/General/ConfirmDialog";
import { TextField } from "@mui/material";
import { deleteAccount } from "lib/firebase/auth";

interface DeleteAccountDialogProps {
  open: boolean;
  onClose: (event: object) => void;
}

const DeleteAccountDialog: FunctionComponent<DeleteAccountDialogProps> = ({
  open,
  onClose,
}) => {
  const [password, setPassword] = useState(null as string | null);
  const onConfirm: FormEventHandler = (e) => {
    e.preventDefault();
    if (password) {
      try {
        deleteAccount(password);
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <ConfirmDialog
      title="Are you sure?"
      onClose={onClose}
      open={open}
      onConfirm={onConfirm}
    >
      This action is irreversible.
      <br />
      Enter your password to continue.
      <form onSubmit={onConfirm}>
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
      </form>
    </ConfirmDialog>
  );
};

export default DeleteAccountDialog;
