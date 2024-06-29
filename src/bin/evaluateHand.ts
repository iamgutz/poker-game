import { Card } from './definitions';
import {
  isFlush,
  isFourOfAKind,
  isFullHouse,
  isRoyalFlush,
  isStraightFlush,
  rankValue,
} from './helpers';

export default function evaluateHand(cards: Card[]): number {
  const sortedCards = cards.sort((a, b) => rankValue(a.rank) - rankValue(b.rank));

  if (isRoyalFlush(sortedCards)) return 10;
  if (isStraightFlush(sortedCards)) return 9;
  if (isFourOfAKind(sortedCards)) return 8;
  if (isFullHouse(sortedCards)) return 7;
  if (isFlush(sortedCards)) return 6;
  return 1;
}
