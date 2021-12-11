import type { FieldValue } from "@firebase/firestore";

export interface LeagueMember {
  uid: string;
  username: string;
  role: string;
}

export interface League {
  id: string;
  name: string;
  owner: string;
  draftType: string;
  leagueType: number;
  createdAt: Date;
  members: LeagueMember[];
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
  members: LeagueMember[];
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
  draftPos: number;
}
