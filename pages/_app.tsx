import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContext } from "lib/context/UserContext";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "components/Login/Login";
import { auth } from "lib/firebase/auth";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import FullPageLoader from "components/FullPageLoader";
import Navbar from "components/Navbar/Navbar";
import { useUserData } from "lib/hooks/useUserData";

function MyApp({ Component, pageProps }: AppProps) {
  const { user, userData, loading, error } = useUserData();

  return (
    <UserContext.Provider value={{ user, userData }}>
      {user ? (
        <>
          <Navbar />
          <Component {...pageProps} />
        </>
      ) : loading ? (
        <FullPageLoader />
      ) : (
        <Login />
      )}
    </UserContext.Provider>
  );
}

export default MyApp;
