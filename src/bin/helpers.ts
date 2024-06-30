import { RANK_VALUES } from './constants';
import { Card, RankGroup } from './definitions';

// Helper function to convert card rank to numerical value for sorting
export const rankValue = (rank: string) => RANK_VALUES[rank];

export function groupByRank(cards: Card[]): RankGroup {
  // takes an array of cards and groups them by their rank into an object.
  const groups: RankGroup = {};
  cards.forEach(card => {
    groups[card.rank] = groups[card.rank] || [];
    groups[card.rank].push(card);
  });
  return groups;
}

function isSomeOfKind(groups: RankGroup, count: number): boolean {
  //checks if there is a group of a certain count in a collection of groups.
  return Object.values(groups).some(group => group.length === count);
}

export function isFlush(cards: Card[]): boolean {
  // at least 5 cards are required
  if (cards.length < 5) return false;
  // checks if all cards in the input array have the same suit
  const firstSuit = cards[0].suit;
  return cards.every(card => card.suit === firstSuit);
}

export function isStraight(cards: Card[]): boolean {
  // at least 5 cards are required
  if (cards.length < 5) return false;
  // checks if a given array of cards forms a straight sequence based on their ranks
  for (let i = 1; i < cards.length; i++) {
    if (rankValue(cards[i].rank) !== rankValue(cards[i - 1].rank) + 1) {
      return false;
    }
  }
  return true;
}

export function isStraightFlush(cards: Card[]): boolean {
  // at least 5 cards are required
  if (cards.length < 5) return false;
  // checks if a given set of cards forms a straight flush.
  return isFlush(cards) && isStraight(cards);
}

export function isRoyalFlush(cards: Card[]): boolean {
  //  checks if the given cards form a royal flush by verifying if it is a straight flush starting with a 10
  return isStraightFlush(cards) && cards[0].rank === '10';
}

export function isFourOfAKind(cards: Card[]): boolean {
  // checks if there is a four-of-a-kind combination in a given set of cards
  return isSomeOfKind(groupByRank(cards), 4);
}

export function isThreeOfAKind(cards: Card[]): boolean {
  // checks if there is a three-of-a-kind combination in a given set of cards
  return isSomeOfKind(groupByRank(cards), 3);
}

export function isPair(cards: Card[]): boolean {
  // checks if a given set of cards contains exactly two pairs of cards with the same rank
  return isSomeOfKind(groupByRank(cards), 2);
}

export function isTwoPair(cards: Card[]): boolean {
  // checks if a given set of cards contains exactly two pairs of cards with the same rank
  const groups = groupByRank(cards);
  return Object.values(groups).filter(group => group.length === 2).length === 2;
}

export function isFullHouse(cards: Card[]): boolean {
  // at least 5 cards are required
  if (cards.length < 5) return false;
  // checks if a given set of cards forms a full house hand in a card game.
  const groups = groupByRank(cards);
  return Object.keys(groups).length === 2 && isSomeOfKind(groups, 3);
}
