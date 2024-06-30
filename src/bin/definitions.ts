export interface Card {
  rank: string;
  suit: string;
}

export type RankGroup = Record<string, Card[]>;

export interface Player {
  name: string;
  hand: Card[];
  stack: number; // Represents the amount of money or chips the player has
  currentBet: number;
  folded: boolean;
}

export interface AIPlayer extends Player {
  id: number;
}
