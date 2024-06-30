import { RANK_VALUES, SUITS } from './constants';
import {
  groupByRank,
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

describe('helpers', () => {
  describe('rankValue', () => {
    // Test cases for valid ranks
    test.each(Object.keys(RANK_VALUES))('returns correct value for rank "%s"', rank => {
      expect(rankValue(rank)).toBe(RANK_VALUES[rank]);
    });

    // Test case for an invalid rank (assuming how you want to handle it)
    test('returns undefined for an invalid rank', () => {
      expect(rankValue('InvalidRank')).toBeUndefined();
    });
  });

  describe('groupByRank', () => {
    test('correctly groups cards by rank', () => {
      const cards = [
        { rank: '2', suit: SUITS.HEARTS },
        { rank: '2', suit: SUITS.DIAMONDS },
        { rank: 'A', suit: SUITS.SPADES },
        { rank: 'K', suit: SUITS.CLUBS },
        { rank: 'A', suit: SUITS.DIAMONDS },
      ];

      const expectedGroups = {
        '2': [
          { rank: '2', suit: SUITS.HEARTS },
          { rank: '2', suit: SUITS.DIAMONDS },
        ],
        A: [
          { rank: 'A', suit: SUITS.SPADES },
          { rank: 'A', suit: SUITS.DIAMONDS },
        ],
        K: [{ rank: 'K', suit: SUITS.CLUBS }],
      };

      expect(groupByRank(cards)).toEqual(expectedGroups);
    });
    test('handles empty array', () => {
      expect(groupByRank([])).toEqual({});
    });
    test('handles array with one card', () => {
      const cards = [{ rank: 'Q', suit: SUITS.HEARTS }];
      const expectedGroups = { Q: [{ rank: 'Q', suit: SUITS.HEARTS }] };
      expect(groupByRank(cards)).toEqual(expectedGroups);
    });
  });

  describe('isFlush', () => {
    test('returns true for a flush', () => {
      const flushCards = [
        { rank: '2', suit: SUITS.HEARTS },
        { rank: '5', suit: SUITS.HEARTS },
        { rank: '10', suit: SUITS.HEARTS },
        { rank: 'K', suit: SUITS.HEARTS },
        { rank: 'A', suit: SUITS.HEARTS },
      ];
      expect(isFlush(flushCards)).toBe(true);
    });
    test('returns false for not a flush', () => {
      const nonFlushCards = [
        { rank: '2', suit: SUITS.HEARTS },
        { rank: '5', suit: SUITS.SPADES },
        { rank: '10', suit: SUITS.HEARTS },
        { rank: 'K', suit: SUITS.HEARTS },
        { rank: 'A', suit: SUITS.HEARTS },
      ];
      expect(isFlush(nonFlushCards)).toBe(false);
    });
    test('returns false if less than 5 cards', () => {
      const singleCard = [{ rank: 'Q', suit: SUITS.DIAMONDS }];
      expect(isFlush(singleCard)).toBe(false);
    });
    test('returns false for an empty array', () => {
      expect(isFlush([])).toBe(false);
    });
  });

  describe('isStraight', () => {
    test('returns true for a straight', () => {
      const straightCards = [
        { rank: '2', suit: SUITS.HEARTS },
        { rank: '3', suit: SUITS.DIAMONDS },
        { rank: '4', suit: SUITS.CLUBS },
        { rank: '5', suit: SUITS.SPADES },
        { rank: '6', suit: SUITS.HEARTS },
      ];
      expect(isStraight(straightCards)).toBe(true);
    });
    test('returns false for not a straight', () => {
      const nonStraightCards = [
        { rank: '2', suit: SUITS.HEARTS },
        { rank: '3', suit: SUITS.DIAMONDS },
        { rank: '4', suit: SUITS.CLUBS },
        { rank: '7', suit: SUITS.SPADES },
        { rank: '6', suit: SUITS.HEARTS },
      ];
      expect(isStraight(nonStraightCards)).toBe(false);
    });
    test('returns false if less than 5 cards', () => {
      const singleCard = [{ rank: 'Q', suit: SUITS.DIAMONDS }];
      expect(isStraight(singleCard)).toBe(false);
    });
    test('returns false on empty array', () => {
      expect(isStraight([])).toBe(false);
    });
  });

  describe('isStraightFlush', () => {
    test('returns true for a straight flush', () => {
      const straightFlushCards = [
        { rank: '2', suit: SUITS.HEARTS },
        { rank: '3', suit: SUITS.HEARTS },
        { rank: '4', suit: SUITS.HEARTS },
        { rank: '5', suit: SUITS.HEARTS },
        { rank: '6', suit: SUITS.HEARTS },
      ];
      expect(isStraightFlush(straightFlushCards)).toBe(true);
    });
    test('returns false for not a straight flush', () => {
      const notStraightFlushCards = [
        { rank: '2', suit: SUITS.HEARTS },
        { rank: '3', suit: SUITS.HEARTS },
        { rank: '4', suit: SUITS.HEARTS },
        { rank: '7', suit: SUITS.HEARTS },
        { rank: '6', suit: SUITS.HEARTS },
      ];
      expect(isStraightFlush(notStraightFlushCards)).toBe(false);
    });
    test('returns false if less than 5 cards', () => {
      const singleCard = [{ rank: 'Q', suit: SUITS.DIAMONDS }];
      expect(isStraightFlush(singleCard)).toBe(false);
    });
    test('returns false on empty array', () => {
      expect(isStraightFlush([])).toBe(false);
    });
  });

  describe('isRoyalFlush', () => {
    test('returns true for a Royal Flush', () => {
      const royalFlushCards = [
        { rank: '10', suit: SUITS.HEARTS },
        { rank: 'J', suit: SUITS.HEARTS },
        { rank: 'Q', suit: SUITS.HEARTS },
        { rank: 'K', suit: SUITS.HEARTS },
        { rank: 'A', suit: SUITS.HEARTS },
      ];
      expect(isRoyalFlush(royalFlushCards)).toBe(true);
    });
    test('returns false if not a Royal Flush', () => {
      const notRoyalFlushCards = [
        { rank: '10', suit: SUITS.HEARTS },
        { rank: 'J', suit: SUITS.HEARTS },
        { rank: 'Q', suit: SUITS.HEARTS },
        { rank: '9', suit: SUITS.HEARTS },
        { rank: 'A', suit: SUITS.HEARTS },
      ];
      expect(isRoyalFlush(notRoyalFlushCards)).toBe(false);
    });
    test('returns false if less than 5 cards', () => {
      const singleCard = [{ rank: 'Q', suit: SUITS.DIAMONDS }];
      expect(isRoyalFlush(singleCard)).toBe(false);
    });
    test('returns false on empty array', () => {
      expect(isRoyalFlush([])).toBe(false);
    });
  });

  describe('isFourOfAKind', () => {
    test('returns true for four of a kind', () => {
      const fourOfAKindCards = [
        { rank: '2', suit: SUITS.HEARTS },
        { rank: '2', suit: SUITS.HEARTS },
        { rank: '2', suit: SUITS.CLUBS },
        { rank: '2', suit: SUITS.SPADES },
        { rank: '5', suit: SUITS.HEARTS },
      ];
      expect(isFourOfAKind(fourOfAKindCards)).toBe(true);
    });
    test('returns false if not four of a kind', () => {
      const notFourOfAKindCards = [
        { rank: '2', suit: SUITS.HEARTS },
        { rank: '2', suit: SUITS.HEARTS },
        { rank: '3', suit: SUITS.CLUBS },
        { rank: '2', suit: SUITS.SPADES },
        { rank: '5', suit: SUITS.HEARTS },
      ];
      expect(isFourOfAKind(notFourOfAKindCards)).toBe(false);
    });
    test('returns false if less than 4 cards', () => {
      const lessThanFourCards = [
        { rank: '10', suit: SUITS.SPADES },
        { rank: '10', suit: SUITS.HEARTS },
        { rank: 'A', suit: SUITS.SPADES },
      ];
      expect(isFourOfAKind(lessThanFourCards)).toBe(false);
    });
    test('returns false on empty array', () => {
      expect(isFourOfAKind([])).toBe(false);
    });
  });

  describe('isThreeOfAKind', () => {
    test('returns true for three of a kind', () => {
      const threeOfAKindCards = [
        { rank: '2', suit: SUITS.HEARTS },
        { rank: '2', suit: SUITS.HEARTS },
        { rank: '3', suit: SUITS.CLUBS },
        { rank: '2', suit: SUITS.SPADES },
        { rank: '5', suit: SUITS.HEARTS },
      ];
      expect(isThreeOfAKind(threeOfAKindCards)).toBe(true);
    });
    test('returns false if not three of a kind', () => {
      const notThreeOfAKindCards = [
        { rank: '2', suit: SUITS.HEARTS },
        { rank: 'Q', suit: SUITS.HEARTS },
        { rank: '3', suit: SUITS.CLUBS },
        { rank: '2', suit: SUITS.SPADES },
        { rank: '5', suit: SUITS.HEARTS },
      ];
      expect(isThreeOfAKind(notThreeOfAKindCards)).toBe(false);
    });
    test('returns false if less than 3 cards', () => {
      const lessThanThreeCards = [
        { rank: '10', suit: SUITS.SPADES },
        { rank: 'A', suit: SUITS.SPADES },
      ];
      expect(isThreeOfAKind(lessThanThreeCards)).toBe(false);
    });
    test('returns false on empty array', () => {
      expect(isThreeOfAKind([])).toBe(false);
    });
  });

  describe('isPair', () => {
    test('returns true for pair', () => {
      const pairCards = [
        { rank: '2', suit: SUITS.HEARTS },
        { rank: '2', suit: SUITS.HEARTS },
        { rank: '3', suit: SUITS.CLUBS },
        { rank: 'Q', suit: SUITS.SPADES },
        { rank: '5', suit: SUITS.HEARTS },
      ];
      expect(isPair(pairCards)).toBe(true);
    });
    test('returns false if not pair', () => {
      const notPairCards = [
        { rank: '2', suit: SUITS.HEARTS },
        { rank: 'Q', suit: SUITS.HEARTS },
        { rank: '3', suit: SUITS.CLUBS },
        { rank: 'J', suit: SUITS.SPADES },
        { rank: '5', suit: SUITS.HEARTS },
      ];
      expect(isPair(notPairCards)).toBe(false);
    });
    test('returns false if less than 2 cards', () => {
      const lessThanTwoCards = [{ rank: 'A', suit: SUITS.SPADES }];
      expect(isPair(lessThanTwoCards)).toBe(false);
    });
    test('returns false on empty array', () => {
      expect(isPair([])).toBe(false);
    });
  });

  describe('isTwoPair', () => {
    test('returns true for two pair', () => {
      const twoPairCards = [
        { rank: '2', suit: SUITS.HEARTS },
        { rank: '2', suit: SUITS.SPADES },
        { rank: '3', suit: SUITS.CLUBS },
        { rank: '3', suit: SUITS.SPADES },
        { rank: '5', suit: SUITS.HEARTS },
      ];
      expect(isTwoPair(twoPairCards)).toBe(true);
    });
    test('returns false if not two pair', () => {
      const notTwoPairCards = [
        { rank: '2', suit: SUITS.HEARTS },
        { rank: 'Q', suit: SUITS.HEARTS },
        { rank: '3', suit: SUITS.CLUBS },
        { rank: '2', suit: SUITS.SPADES },
        { rank: '5', suit: SUITS.HEARTS },
      ];
      expect(isTwoPair(notTwoPairCards)).toBe(false);
    });
    test('returns false if less than 4 cards', () => {
      const lessThanFourCards = [
        { rank: '2', suit: SUITS.HEARTS },
        { rank: '3', suit: SUITS.CLUBS },
        { rank: '2', suit: SUITS.SPADES },
      ];
      expect(isTwoPair(lessThanFourCards)).toBe(false);
    });
    test('returns false on empty array', () => {
      expect(isTwoPair([])).toBe(false);
    });
  });

  describe('isFullHouse', () => {
    test('returns true for a full house', () => {
      const fullHouseCards = [
        { rank: '3', suit: SUITS.HEARTS },
        { rank: '3', suit: SUITS.DIAMONDS },
        { rank: '3', suit: SUITS.CLUBS },
        { rank: '5', suit: SUITS.SPADES },
        { rank: '5', suit: SUITS.HEARTS },
      ];
      expect(isFullHouse(fullHouseCards)).toBe(true);
    });
    test('returns false if not a full house', () => {
      const notFullHouseCards = [
        { rank: '3', suit: SUITS.HEARTS },
        { rank: '3', suit: SUITS.DIAMONDS },
        { rank: '3', suit: SUITS.CLUBS },
        { rank: '4', suit: SUITS.SPADES },
        { rank: '5', suit: SUITS.HEARTS },
      ];
      expect(isFullHouse(notFullHouseCards)).toBe(false);
    });
    test('returns false if less than 5 cards', () => {
      const notEnoughCards = [
        { rank: '3', suit: SUITS.HEARTS },
        { rank: '3', suit: SUITS.DIAMONDS },
        { rank: '4', suit: SUITS.SPADES },
        { rank: '5', suit: SUITS.HEARTS },
      ];
      expect(isFullHouse(notEnoughCards)).toBe(false);
    });
    test('returns false on empty array', () => {
      expect(isFullHouse([])).toBe(false);
    });
  });
});
