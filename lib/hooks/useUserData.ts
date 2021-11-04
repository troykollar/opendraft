import { useEffect, useState } from "react";

import { auth } from "lib/firebase/auth";
import { firestore } from "lib/firebase/firestore";
import { doc, Unsubscribe, onSnapshot, DocumentData } from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

export function useUserData() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null as DocumentData | null);

  useEffect(() => {
    let unsubscribe: Unsubscribe;

    if (user) {
      unsubscribe = onSnapshot(
        doc(firestore, `/users/${user.uid}`),
        (docSnap) => {
          setUserData(docSnap.data);
        },
      );
    } else setUserData(null);

    return unsubscribe!;
  }, [user]);

  return { user, userData };
}
