import { createContext } from "react";
import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";

export const UserContext = createContext({
  user: null as User | null | undefined,
  userData: undefined as DocumentData | undefined,
});
