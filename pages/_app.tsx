import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useContext } from "react";
import { UserContext } from "lib/context/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  const { user, userData } = useContext(UserContext);
  return (
    <UserContext.Provider value={{ user, userData }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
