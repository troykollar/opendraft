import type { FieldValue } from "@firebase/firestore";

export interface League {
  id: string;
  name: string;
  owner: string;
  draftType: string;
  leagueType: number;
  createdAt: Date;
  members: string[];
  open: boolean;
  teams: Team[];
  status: string;
}

export interface LeagueDoc {
  name: string;
  owner: string;
  draftType: string;
  leagueType: number;
  createdAt: FieldValue;
  members: string[];
  open: boolean;
  teams: Team[];
  status: string;
}

export interface Player {
  firstName: string;
  lastName: string;
  number: number;
  teamLoc: string;
  teamName: string;
  pos: string;
  rank: number;
}

export interface Team {
  name: string;
  owner: string;
  players: Player[];
}
