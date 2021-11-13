import { firestore } from "lib/firebase/firestore";
import { auth } from "lib/firebase/auth";
import { collection, query, Timestamp, where } from "@firebase/firestore";
import type { FirestoreDataConverter } from "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

import type { League } from "lib/types";

const leagueConverter: FirestoreDataConverter<League> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return <League>{
      name: data.name,
      draftType: data.draftType,
      leagueType: data.leagueType,
      owner: data.owner,
      createdAt: data.createdAt ? data.createdAt.toDate() : null,
    };
  },
  toFirestore(league: League) {
    return {
      id: league.id,
      name: league.name,
      draftType: league.draftType,
      leagueType: league.leagueType,
      owner: league.owner,
      createdAt: Timestamp.fromDate(league.createdAt),
    };
  },
};

export function useMyLeagues() {
  const uid = auth.currentUser!.uid;
  const leaguesRef = collection(firestore, "/leagues");
  const leagueQuery = query(
    leaguesRef,
    where("owner", "==", uid),
  ).withConverter(leagueConverter);
  return useCollectionData(leagueQuery, { idField: "id" });
}
