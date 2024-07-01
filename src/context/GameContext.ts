import { createContext, useContext } from 'react';
import { AIPlayer, Card, Player } from '../bin/definitions';

export interface GameState {
  communityCards: Card[];
  pot: number;
  currentBet: number;
  minimumRaise: number;
  aiPlayers: AIPlayer[];
  aiPlayersNumber: number;
  gameStarted: boolean;
  positionDealer: number;
  positionBigBlind: number;
  positionSmallBlind: number;
  round: number;
  player: Player;
}

export interface GameContextProps {
  state: GameState;
  setCommunityCards: (cards: Card[]) => void;
  setPot: (pot: number) => void;
  setCurrentBet: (bet: number) => void;
  setMinimumRaise: (raise: number) => void;
  setAIPlayers: (AIPlayers: AIPlayer[]) => void;
  setPlayer: (player: Player) => void;
  setAIPlayersNumber: (num: number) => void;
  setGameStarted: (started: boolean) => void;
  setRound: (round: number) => void;
  setSmallBlindPosition: (pos: number) => void;
  setBigBlindPosition: (pos: number) => void;
  setDealerPosition: (pos: number) => void;
  setPlayerName: (name: string) => void;
  setPlayerAvatar: (avatar: number) => void;
  resetGame: () => void;
}

export const GameContext = createContext<GameContextProps | undefined>(undefined);

export default function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}
