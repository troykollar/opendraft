import { AppBar, Toolbar } from "@mui/material";
import type { FunctionComponent } from "react";
import AccountButton from "./AccountButton/AccountButton";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <div style={{ flexGrow: 1 }}>OpenDraft.io</div>
        <AccountButton />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
