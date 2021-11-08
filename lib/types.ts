enum DraftType {
  SNAKE = 0,
  STANDARD = 1,
}

enum LeagueType {
  NFL = 0,
}

export interface League {
  name: string;
  ownerUid: string;
  draftType: DraftType;
  leagueType: LeagueType;
  createdAt: Date;
  id: string;
}
