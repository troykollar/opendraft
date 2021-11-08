import { firestore } from "lib/firebase/firestore";
import { auth } from "lib/firebase/auth";
import { collection, query, where } from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

export function useMyLeagues() {
  const uid = auth.currentUser!.uid;
  const leaguesRef = collection(firestore, "/leagues");
  const leagueQuery = query(leaguesRef, where("ownerUid", "==", uid));
  return useCollectionData(leagueQuery, { idField: "id" });
}
