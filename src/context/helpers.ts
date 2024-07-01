import { AIPlayer, Player } from '../bin/definitions';
import { NAME_ADJETIVES, NAME_NOUNS } from './constants';

export function generateRandomAIPlayerNames(numPlayers: number): string[] {
  const adjectives = NAME_ADJETIVES;
  const nouns = NAME_NOUNS;
  const names: string[] = [];

  for (let i = 0; i < numPlayers; i++) {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const playerName = `${adjective} ${noun}`;
    names.push(playerName);
  }

  return names;
}

export const generateAIPlayers = (numPlayers: number) => {
  const playerNames = generateRandomAIPlayerNames(numPlayers);
  const generatedPlayers: AIPlayer[] = [];
  for (let i = 0; i < numPlayers; i++) {
    const randomAvatar = Math.floor(Math.random() * 16) + 1;
    const aiPlayer: AIPlayer = {
      id: Date.now() + i,
      avatar: randomAvatar,
      kind: 'cpu',
      name: playerNames[i],
      hand: [],
      currentBet: 0,
      folded: false,
      stack: 500,
      isDealer: false,
      isBigBlind: false,
      isSmallBlind: false,
    };
    generatedPlayers.push(aiPlayer);
  }
  return generatedPlayers;
};

export const generatePlayer = (name: string = '', avatar: number = 1): Player => {
  const generatedPlayer: Player = {
    id: 99,
    name,
    avatar,
    kind: 'user',
    hand: [],
    currentBet: 0,
    folded: false,
    stack: 500,
    isDealer: false,
    isBigBlind: false,
    isSmallBlind: false,
  };

  return generatedPlayer;
};
