import { Card } from './definitions';
import {
  isFlush,
  isFourOfAKind,
  isFullHouse,
  isPair,
  isRoyalFlush,
  isStraight,
  isStraightFlush,
  isThreeOfAKind,
  isTwoPair,
  rankValue,
} from './helpers';

export default function evaluateHand(cards: Card[]): number {
  const sortedCards = cards.sort((a, b) => rankValue(a.rank) - rankValue(b.rank));

  // Check for specific hand combinations in descending order of strength
  if (isRoyalFlush(sortedCards)) return 10;
  if (isStraightFlush(sortedCards)) return 9;
  if (isFourOfAKind(sortedCards)) return 8;
  if (isFullHouse(sortedCards)) return 7;
  if (isFlush(sortedCards)) return 6;
  if (isStraight(sortedCards)) return 5;
  if (isThreeOfAKind(sortedCards)) return 4;
  if (isTwoPair(sortedCards)) return 3;
  if (isPair(sortedCards)) return 2;

  return 1; // High Card (lowest rank)
}
