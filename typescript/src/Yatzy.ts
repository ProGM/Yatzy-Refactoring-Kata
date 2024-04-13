import { DiceTally } from "./DiceTally";
import { MAX_DICE_VALUE, MIN_DICE_VALUE } from "./constants";
import { sum } from "./utils";

const YATZY_DICE_NUMBER = 5;

export default class Yatzy {
  private dice: number[];

  constructor(d1: number, d2: number, d3: number, d4: number, d5: number) {
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

    return this.areDiceAllTheSame(tallies) ? 50 : 0;
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
    return tallies.getDescendingScoresValueByCount(2, 1);
  }

  two_pair(): number {
    const tallies = this.getDiceTally();
    return tallies.getDescendingScoresValueByCount(2, 2);
  }

  four_of_a_kind(): number {
    const tallies = this.getDiceTally();
    return tallies.getDescendingScoresValueByCount(4, 1);
  }

  three_of_a_kind(): number {
    const tallies = this.getDiceTally();
    return tallies.getDescendingScoresValueByCount(3, 1);
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

    if (!tallies.contains(3)) {
      return 0;
    }

    if (!tallies.contains(2)) {
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
