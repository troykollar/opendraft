import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { firestore } from "lib/firebase/firestore";
import { auth } from "lib/firebase/auth";
import type { LeagueDoc, Team } from "lib/types";

async function createLeague(
  name: string,
  draftType: string,
  numTeams: number,
  open: boolean,
) {
  if (auth.currentUser) {
    let teams: Team[] = [];
    for (let i = 0; i < numTeams; i++) {
      teams.push({
        name: `Team ${i + 1}`,
        owner: auth.currentUser.uid,
        players: [],
      });
    }
    let league: LeagueDoc = {
      createdAt: serverTimestamp(),
      draftType,
      leagueType: 0,
      name,
      owner: auth.currentUser.uid,
      members: [],
      open,
      teams,
      status: "setup",
    };

    try {
      return await addDoc(collection(firestore, "leagues"), league);
    } catch (err) {
      throw err;
    }
  } else {
    throw new Error("auth/not-signed-in");
  }
}

export default createLeague;
