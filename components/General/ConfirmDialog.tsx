import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import type { EventHandler, FunctionComponent, SyntheticEvent } from "react";

interface ConfirmDialogProps {
  title: string;
  open: boolean;
  onClose: (event: object) => void;
  onConfirm: EventHandler<SyntheticEvent>;
}

const ConfirmDialog: FunctionComponent<ConfirmDialogProps> = ({
  title,
  open,
  onClose,
  onConfirm,
  children,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
