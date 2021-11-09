import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import type { FunctionComponent } from "react";
import { useState } from "react";

interface CreateLeagueDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateLeagueDialog: FunctionComponent<CreateLeagueDialogProps> = ({
  open,
  onClose,
}) => {
  const [leagueName, setLeagueName] = useState("");
  const [draftType, setDraftType] = useState("");
  const [numTeams, setNumTeams] = useState("");

  const handleClose = () => {
    setLeagueName("");
    setDraftType("");
    setNumTeams("");
    onClose();
  };

  return (
    <Container maxWidth="sm">
      <Dialog open={open} fullWidth maxWidth="sm">
        <form>
          <DialogTitle sx={{ textAlign: "center" }}>Create League</DialogTitle>
          <DialogContent>
            <TextField
              sx={{ marginTop: 2, marginBottom: 3 }}
              label="League Name"
              fullWidth
              onChange={(e) => setLeagueName(e.target.value)}
            />
            <FormControl fullWidth sx={{ marginBottom: 3 }}>
              <InputLabel id="drafttype-select-label">Draft Type</InputLabel>
              <Select
                label="Draft Type"
                value={draftType}
                fullWidth
                labelId="drafttype-select-label"
                onChange={(e) => setDraftType(e.target.value)}
              >
                <MenuItem value={"snake"}>Snake</MenuItem>
                <MenuItem value={"standard"}>Standard</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="teamnum-select-label">Number of teams</InputLabel>
              <Select
                label="Number of teams"
                value={numTeams}
                fullWidth
                labelId="drafttype-select-label"
                onChange={(e) => setNumTeams(e.target.value)}
              >
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={16}>16</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => console.log("create")}>Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default CreateLeagueDialog;
