import { GameState } from '../context/GameContext';
import { ACTIONS } from './constants';
import { AIPlayer } from './definitions';

export default function applyAIDecision(
  aiPlayer: AIPlayer,
  decision: string,
  gameState: GameState,
): void {
  let raiseAmount = 0;
  let callAmount = 0;
  switch (decision) {
    case ACTIONS.RAISE:
      raiseAmount = gameState.currentBet + gameState.minimumRaise;
      aiPlayer.stack -= raiseAmount;
      aiPlayer.currentBet += raiseAmount;
      gameState.pot += raiseAmount;
      gameState.currentBet = raiseAmount;
      break;
    case ACTIONS.CALL:
      callAmount = gameState.currentBet - aiPlayer.currentBet;
      aiPlayer.stack -= callAmount;
      aiPlayer.currentBet += callAmount;
      gameState.pot += callAmount;
      break;
    case ACTIONS.FOLD:
      aiPlayer.folded = true;
      break;
  }
}
