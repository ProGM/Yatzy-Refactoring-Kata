import { DiceTally } from "./DiceTally";
import { MAX_DICE_VALUE, MIN_DICE_VALUE } from "./constants";
import { sum } from "./utils";

const YATZY_DICE_NUMBER = 5;
const PAIR = 2;
const FOUR_OF_A_KIND = 4;
const THREE_OF_A_KIND = 3;
const YATZY_SCORE = 50;

type DIE_VALUE = 1 | 2 | 3 | 4 | 5 | 6;

export default class Yatzy {
  private dice: number[];

  constructor(d1: DIE_VALUE, d2: DIE_VALUE, d3: DIE_VALUE, d4: DIE_VALUE, d5: DIE_VALUE) {
    this.dice = [d1, d2, d3, d4, d5];
    for (const d of this.dice) {
      if (d < MIN_DICE_VALUE || d > MAX_DICE_VALUE) {
        throw new Error(`Invalid dice value: ${d}`);
      }
    }
  }

  chance(): number {
    return sum(this.dice);
  }

  yatzy(): number {
    var tallies = this.getDiceTally();

    return this.areDiceAllTheSame(tallies) ? YATZY_SCORE : 0;
  }

  ones(): number {
    return this.sumIfValueIs(1);
  }

  twos(): number {
    return this.sumIfValueIs(2);
  }

  threes(): number {
    return this.sumIfValueIs(3);
  }

  fours(): number {
    return this.sumIfValueIs(4);
  }

  fives(): number {
    return this.sumIfValueIs(5);
  }

  sixes(): number {
    return this.sumIfValueIs(6);
  }

  score_pair(): number {
    const tallies = this.getDiceTally();
    return tallies.getDescendingScoresValueByCount(PAIR, 1);
  }

  two_pair(): number {
    const tallies = this.getDiceTally();
    return tallies.getDescendingScoresValueByCount(PAIR, 2);
  }

  four_of_a_kind(): number {
    const tallies = this.getDiceTally();
    return tallies.getDescendingScoresValueByCount(FOUR_OF_A_KIND, 1);
  }

  three_of_a_kind(): number {
    const tallies = this.getDiceTally();
    return tallies.getDescendingScoresValueByCount(THREE_OF_A_KIND, 1);
  }

  smallStraight(): number {
    const tallies = this.getDiceTally();
    return tallies.hasStraightFromTo(MIN_DICE_VALUE, MAX_DICE_VALUE - 1) ? sum(this.dice) : 0;
  }

  largeStraight(): number {
    const tallies = this.getDiceTally();
    return tallies.hasStraightFromTo(MIN_DICE_VALUE + 1, MAX_DICE_VALUE) ? sum(this.dice) : 0;
  }

  fullHouse(): number {
    const tallies = this.getDiceTally();

    if (!tallies.contains(THREE_OF_A_KIND)) {
      return 0;
    }

    if (!tallies.contains(PAIR)) {
      return 0;
    }

    return sum(this.dice);
  }

  private getDiceTally(): DiceTally {
    return new DiceTally(this.dice);
  }

  private areDiceAllTheSame(tallies: DiceTally): boolean {
    return tallies.contains(YATZY_DICE_NUMBER);
  }

  private sumIfValueIs(value: number): number {
    return sum(this.dice.filter(d => d === value));
  }
}
