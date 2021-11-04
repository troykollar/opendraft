import { createContext } from "react";
import { User } from "firebase/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

export const UserContext = createContext({
  user: null as User | null | undefined,
  userData: null as ReturnType<typeof useDocumentData> | null,
});
