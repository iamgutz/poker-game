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
    const aiPlayer: AIPlayer = {
      id: i + 1,
      name: playerNames[i],
      hand: [],
      currentBet: 0,
      folded: false,
      stack: 0,
    };
    generatedPlayers.push(aiPlayer);
  }
  return generatedPlayers;
};

export const generatePlayer = (name: string = ''): Player => {
  const generatedPlayer = {
    name,
    hand: [],
    currentBet: 0,
    folded: false,
    stack: 0,
  };

  return generatedPlayer;
};
