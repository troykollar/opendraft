import {
  createRef,
  FunctionComponent,
  MouseEventHandler,
  useContext,
  useState,
} from "react";
import Link from "next/link";
import { UserContext } from "lib/context/UserContext";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { logOut } from "lib/firebase/auth";

interface UserAvatarProps {}

const AccountButton: FunctionComponent<UserAvatarProps> = () => {
  const { user } = useContext(UserContext);
  const [menuAnchor, setMenuAnchor] = useState(null as Element | null);

  const menuOpen = Boolean(menuAnchor);

  const handleClick: MouseEventHandler = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar
          src={user?.photoURL ? user.photoURL : ""}
          alt={user?.displayName ? user.displayName : "User Avatar"}
        >
          {user?.email?.slice(0, 1).toUpperCase()}
        </Avatar>
      </IconButton>

      <Menu anchorEl={menuAnchor} open={menuOpen} onClose={handleMenuClose}>
        <Link href="/account">
          <MenuItem>Account Info</MenuItem>
        </Link>
        <MenuItem onClick={logOut}>Log out</MenuItem>
      </Menu>
    </>
  );
};

export default AccountButton;
