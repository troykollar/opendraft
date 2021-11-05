import { AppBar, Toolbar } from "@mui/material";
import { FunctionComponent } from "react";
import AccountButton from "./AccountButton/AccountButton";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  return (
    <AppBar>
      <Toolbar>
        <div style={{ flexGrow: 1 }}>OpenDraft.io</div>
        <AccountButton />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
