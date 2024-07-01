export interface Card {
  rank: string;
  suit: string;
}

export type RankGroup = Record<string, Card[]>;

export interface Player {
  id: number;
  avatar: number;
  kind: 'cpu' | 'user';
  name: string;
  hand: Card[];
  stack: number; // Represents the amount of money or chips the player has
  currentBet: number;
  folded: boolean;
  isDealer: boolean;
  isBigBlind: boolean;
  isSmallBlind: boolean;
}

export interface AIPlayer extends Player {
  id: number;
}
