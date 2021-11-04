import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useContext } from "react";
import { UserContext } from "lib/context/UserContext";
import Login from "components/Login/Login";

function MyApp({ Component, pageProps }: AppProps) {
  const { user, userData } = useContext(UserContext);
  return (
    <UserContext.Provider value={{ user, userData }}>
      {user ? <Component {...pageProps} /> : <Login />}
    </UserContext.Provider>
  );
}

export default MyApp;
