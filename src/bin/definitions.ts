export interface Card {
  rank: string;
  suit: string;
}

export type RankGroup = Record<string, Card[]>;
