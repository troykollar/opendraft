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
      ownerUid: data.ownerUid,
      createdAt: data.createdAt.toDate(),
    };
  },
  toFirestore(league: League) {
    return {
      id: league.id,
      name: league.name,
      draftType: league.draftType,
      leagueType: league.leagueType,
      ownerUid: league.ownerUid,
      createdAt: Timestamp.fromDate(league.createdAt),
    };
  },
};

export function useMyLeagues() {
  const uid = auth.currentUser!.uid;
  const leaguesRef = collection(firestore, "/leagues");
  const leagueQuery = query(
    leaguesRef,
    where("ownerUid", "==", uid)
  ).withConverter(leagueConverter);
  return useCollectionData(leagueQuery, { idField: "id" });
}
