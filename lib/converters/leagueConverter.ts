import type { FirestoreDataConverter } from "firebase/firestore";
import { League } from "lib/types";

const leagueConverter: FirestoreDataConverter<League> = {
  fromFirestore(docSnap) {
    let league = docSnap.data();
    league.createdAt = league.createdAt.toDate();
    return league as League;
  },
  toFirestore(league: League) {
    return league;
  },
};

export default leagueConverter;
