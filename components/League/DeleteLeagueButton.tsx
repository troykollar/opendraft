import { Button, DialogContentText } from "@mui/material";
import type { FunctionComponent } from "react";
import { useState } from "react";

import ConfirmDialog from "components/General/ConfirmDialog";
import { League } from "lib/types";
import deleteLeague from "lib/league/deleteLeague";
import { useRouter } from "next/router";

interface DeleteLeagueButtonProps {
  id: string;
  league: League;
}

const DeleteLeagueButton: FunctionComponent<DeleteLeagueButtonProps> = ({
  id,
  league,
}) => {
  const [dialog, setDialog] = useState(false);
  const router = useRouter();
  return (
    <>
      <Button onClick={() => setDialog(true)} color="error" variant="contained">
        Delete
      </Button>
      <ConfirmDialog
        title={`Delete ${league.name}`}
        open={dialog}
        onClose={() => setDialog(false)}
        onConfirm={async () => {
          await deleteLeague(id);
          router.push("/");
        }}
      >
        <DialogContentText>
          Are you sure? This cannot be undone.
        </DialogContentText>
      </ConfirmDialog>
    </>
  );
};

export default DeleteLeagueButton;
