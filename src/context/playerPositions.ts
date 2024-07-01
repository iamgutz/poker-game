import { AIPlayer, Player } from '../bin/definitions';
import { GameContextProps, GameState } from './GameContext';

export function handleSetDealerPosition(
  gameState: GameState,
  setDealerPosition: (pos: number) => void,
): void {
  const { aiPlayers } = gameState;
  // Get current dealer position from game state or initialize if it's the first round
  let currentDealerPosition = gameState.positionDealer !== undefined ? gameState.positionDealer : 0;

  // Calculate the next dealer position (rotating clockwise)
  currentDealerPosition = (currentDealerPosition + 1) % aiPlayers.length;

  // Update the dealer position in game state
  setDealerPosition(currentDealerPosition);
}

interface SetBlindsProps extends Partial<GameContextProps> {
  setBigBlindPosition: (pos: number) => void;
  setSmallBlindPosition: (pos: number) => void;
  setPot: (pot: number) => void;
  setCurrentBet: (bet: number) => void;
  setAIPlayers: (aiPlayers: AIPlayer[]) => void;
  setPlayer: (player: Player) => void;
}

export function handleSetBlinds({
  state,
  setBigBlindPosition,
  setSmallBlindPosition,
  setPot,
  setCurrentBet,
  setAIPlayers,
  setPlayer,
}: SetBlindsProps): void {
  const smallBlindAmount: number = 10;
  const bigBlindAmount: number = 20;
  const { aiPlayers, player, currentBet, positionDealer, pot } = state as GameState;
  const players = [player, ...aiPlayers];

  // Determine positions for small blind and big blind
  const numPlayers = players.length; // Including the human player
  const smallBlindPosition = (positionDealer + 1) % numPlayers;
  const bigBlindPosition = (positionDealer + 2) % numPlayers;
  setBigBlindPosition(bigBlindPosition || 0);
  setSmallBlindPosition(smallBlindPosition);

  // Deduct blinds from players' stacks and add to the pot
  players.map((player, index) => {
    if (index === smallBlindPosition) {
      player.currentBet = Math.min(smallBlindAmount, player.stack); // Ensure small blind doesn't exceed stack
      player.stack -= player.currentBet;
      player.isDealer = false;
      player.isBigBlind = false;
      player.isSmallBlind = true;
    } else if (index === bigBlindPosition) {
      player.currentBet = Math.min(bigBlindAmount, player.stack); // Ensure big blind doesn't exceed stack
      player.stack -= player.currentBet;
      player.isDealer = false;
      player.isBigBlind = true;
      player.isSmallBlind = false;
    } else if (index === positionDealer) {
      player.isDealer = true;
      player.isBigBlind = false;
      player.isSmallBlind = false;
    }
    setPot(pot + player.currentBet);
    return player;
  });

  const updatedAIPlayers = players.splice(1);
  const updatedPlayer = players.splice(0, 1);

  setAIPlayers(updatedAIPlayers);
  setPlayer(updatedPlayer[0]);
  // Update current bet to the big blind amount
  setCurrentBet(Math.max(bigBlindAmount, currentBet)); // Ensure currentBet is at least bigBlindAmount
}
