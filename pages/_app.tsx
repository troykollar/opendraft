import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContext } from "lib/context/UserContext";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "components/Login/Login";
import { auth } from "lib/firebase/auth";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import FullPageLoader from "components/FullPageLoader";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth);
  return (
    <UserContext.Provider value={{ user }}>
      <div>{JSON.stringify(user)}</div>
      {user ? (
        <>
          <Button onClick={() => signOut(auth)}>Sign Out</Button>
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
