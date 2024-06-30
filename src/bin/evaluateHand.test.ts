import { SUITS } from './constants';
import evaluateHand from './evaluateHand';

describe('evaluateHand function', () => {
  test('returns 10 for a royal flush', () => {
    const royalFlushCards = [
      { rank: '10', suit: SUITS.HEARTS },
      { rank: 'J', suit: SUITS.HEARTS },
      { rank: 'Q', suit: SUITS.HEARTS },
      { rank: 'K', suit: SUITS.HEARTS },
      { rank: 'A', suit: SUITS.HEARTS },
    ];
    expect(evaluateHand(royalFlushCards)).toBe(10);
  });

  test('returns 9 for a straight flush', () => {
    const straightFlushCards = [
      { rank: '9', suit: SUITS.HEARTS },
      { rank: '10', suit: SUITS.HEARTS },
      { rank: 'J', suit: SUITS.HEARTS },
      { rank: 'Q', suit: SUITS.HEARTS },
      { rank: 'K', suit: SUITS.HEARTS },
    ];
    expect(evaluateHand(straightFlushCards)).toBe(9);
  });

  test('returns 8 for four of a kind', () => {
    const fourOfAKindCards = [
      { rank: '4', suit: SUITS.HEARTS },
      { rank: '4', suit: SUITS.DIAMONDS },
      { rank: '4', suit: SUITS.CLUBS },
      { rank: '4', suit: SUITS.SPADES },
      { rank: '2', suit: SUITS.HEARTS },
    ];
    expect(evaluateHand(fourOfAKindCards)).toBe(8);
  });

  test('returns 7 for a full house', () => {
    const fullHouseCards = [
      { rank: '3', suit: SUITS.HEARTS },
      { rank: '3', suit: SUITS.DIAMONDS },
      { rank: '3', suit: SUITS.CLUBS },
      { rank: '5', suit: SUITS.SPADES },
      { rank: '5', suit: SUITS.HEARTS },
    ];
    expect(evaluateHand(fullHouseCards)).toBe(7);
  });

  test('returns 6 for a flush', () => {
    const flushCards = [
      { rank: '2', suit: SUITS.HEARTS },
      { rank: '4', suit: SUITS.HEARTS },
      { rank: '6', suit: SUITS.HEARTS },
      { rank: '8', suit: SUITS.HEARTS },
      { rank: '10', suit: SUITS.HEARTS },
    ];
    expect(evaluateHand(flushCards)).toBe(6);
  });

  test('returns 5 for a straight', () => {
    const straightCards = [
      { rank: '5', suit: SUITS.HEARTS },
      { rank: '6', suit: SUITS.CLUBS },
      { rank: '7', suit: SUITS.DIAMONDS },
      { rank: '8', suit: SUITS.SPADES },
      { rank: '9', suit: SUITS.HEARTS },
    ];
    expect(evaluateHand(straightCards)).toBe(5);
  });

  test('returns 4 for three of a kind', () => {
    const threeOfAKindCards = [
      { rank: '7', suit: SUITS.HEARTS },
      { rank: '7', suit: SUITS.DIAMONDS },
      { rank: '7', suit: SUITS.CLUBS },
      { rank: '9', suit: SUITS.SPADES },
      { rank: '2', suit: SUITS.HEARTS },
    ];
    expect(evaluateHand(threeOfAKindCards)).toBe(4);
  });

  test('returns 3 for two pair', () => {
    const twoPairCards = [
      { rank: '4', suit: SUITS.HEARTS },
      { rank: '4', suit: SUITS.DIAMONDS },
      { rank: '6', suit: SUITS.CLUBS },
      { rank: '6', suit: SUITS.SPADES },
      { rank: '2', suit: SUITS.HEARTS },
    ];
    expect(evaluateHand(twoPairCards)).toBe(3);
  });

  test('returns 2 for a pair', () => {
    const pairCards = [
      { rank: '5', suit: SUITS.HEARTS },
      { rank: '5', suit: SUITS.DIAMONDS },
      { rank: '7', suit: SUITS.CLUBS },
      { rank: '9', suit: SUITS.SPADES },
      { rank: '2', suit: SUITS.HEARTS },
    ];
    expect(evaluateHand(pairCards)).toBe(2);
  });

  test('returns 1 for high card', () => {
    const highCardCards = [
      { rank: '2', suit: SUITS.HEARTS },
      { rank: '4', suit: SUITS.DIAMONDS },
      { rank: '6', suit: SUITS.CLUBS },
      { rank: '8', suit: SUITS.SPADES },
      { rank: '10', suit: SUITS.HEARTS },
    ];
    expect(evaluateHand(highCardCards)).toBe(1);
  });
});
