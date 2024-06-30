import { GameState } from '../context/GameContext';
import { ACTIONS } from './constants';
import { AIPlayer } from './definitions';
import evaluateHand from './evaluateHand';

export default function makeAIDecision(aiPlayer: AIPlayer, gameState: GameState): string {
  // Evaluate AI player's hand strength
  const handStrength = evaluateHand([...aiPlayer.hand, ...gameState.communityCards]);

  // Calculate pot odds
  const potOdds = gameState.pot / (gameState.pot + gameState.currentBet - aiPlayer.currentBet);

  // Adjust decision based on hand strength and pot odds
  if (gameState.currentBet === 0) {
    // if not bet has been made, decide to check or bet
    if (handStrength >= 8 || Math.random() < 0.1) {
      return ACTIONS.RAISE; // Raise with strong hands or occasionally bluff
    } else {
      return ACTIONS.CHECK;
    }
  } else {
    // if a bet has been made, decide to call, raise, or fold
    if (handStrength >= 8 || Math.random() < 0.1) {
      return ACTIONS.RAISE; // Raise with strong hands or occasionally bluff
    } else if (handStrength >= 5 && potOdds > 0.5) {
      return ACTIONS.CALL; // Call with medium hands if pot odds are favorable
    } else {
      return ACTIONS.FOLD; // Fold with weak hands
    }
  }
}
