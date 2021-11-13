import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import type { FunctionComponent, FormEventHandler } from "react";
import { useState } from "react";

interface ChangeTextDialogProps {
  title: string;
  inputLabel: string;
  open: boolean;
  onClose: () => void;
  onConfirm: (value: string) => Promise<void>;
}

const ChangeTextDialog: FunctionComponent<ChangeTextDialogProps> = ({
  title,
  inputLabel,
  open,
  onClose,
  onConfirm,
}) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onConfirm(value);
    setLoading(false);
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={() => {
        setValue("");
        onClose();
      }}
      fullWidth
    >
      <form onSubmit={onSubmit}>
        <DialogTitle>
          <Grid container>
            <Grid item xs={10}>
              {title}
            </Grid>
            <Grid item xs={2} textAlign="right">
              {loading && <CircularProgress size={25} />}
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginTop: 1, marginBottom: 1 }}
            fullWidth
            label={inputLabel}
            onChange={(e) => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Confirm</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChangeTextDialog;
