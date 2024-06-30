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
}

export function handleSetBlinds({
  state,
  setBigBlindPosition,
  setSmallBlindPosition,
  setPot,
  setCurrentBet,
}: SetBlindsProps): void {
  const smallBlindAmount: number = 10;
  const bigBlindAmount: number = 20;
  const { aiPlayers, currentBet, positionDealer, pot } = state as GameState;

  // Determine positions for small blind and big blind
  const numPlayers = aiPlayers.length + 1; // Including the human player
  const smallBlindPosition = (positionDealer + 1) % numPlayers;
  const bigBlindPosition = (positionDealer + 2) % numPlayers;
  setBigBlindPosition(bigBlindPosition || 0);
  setSmallBlindPosition(smallBlindPosition);

  // Deduct blinds from players' stacks and add to the pot
  const updatedAIPlayers = [...aiPlayers];

  updatedAIPlayers.map((player, index) => {
    if (index === smallBlindPosition) {
      player.currentBet = Math.min(smallBlindAmount, player.stack); // Ensure small blind doesn't exceed stack
      player.stack -= player.currentBet;
    } else if (index === bigBlindPosition) {
      player.currentBet = Math.min(bigBlindAmount, player.stack); // Ensure big blind doesn't exceed stack
      player.stack -= player.currentBet;
    }
    setPot(pot + player.currentBet);
    return player;
  });

  // Update current bet to the big blind amount
  setCurrentBet(Math.max(bigBlindAmount, currentBet)); // Ensure currentBet is at least bigBlindAmount
}
