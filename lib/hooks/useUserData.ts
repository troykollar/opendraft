import { useEffect, useState } from "react";

import { auth } from "lib/firebase/auth";
import { firestore } from "lib/firebase/firestore";
import { doc, Unsubscribe, onSnapshot, DocumentData } from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

export function useUserData() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(
    undefined as DocumentData | undefined,
  );

  useEffect(() => {
    let unsubscribe: Unsubscribe;

    if (user) {
      unsubscribe = onSnapshot(
        doc(firestore, `/users/${user.uid}`),
        (docSnap) => {
          setUserData(docSnap.data());
        },
      );
    } else setUserData(undefined);

    return unsubscribe!;
  }, [user]);

  return { user, userData, loading, error };
}
