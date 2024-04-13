import { sum } from "./utils";

const MIN_DICE_VALUE = 1;
const MAX_DICE_VALUE = 6;

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
    var counts = this.countDiceByValue();

    return this.areDiceAllTheSame(counts) ? 50 : 0;
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
    const counts = this.countDiceByValue();
    return this.getDescendingScoresValueByCount(counts, 2, 1);
  }

  two_pair(): number {
    const counts = this.countDiceByValue();
    return this.getDescendingScoresValueByCount(counts, 2, 2);
  }

  four_of_a_kind(): number {
    const counts = this.countDiceByValue();
    return this.getDescendingScoresValueByCount(counts, 4, 1);
  }

  three_of_a_kind(): number {
    const counts = this.countDiceByValue();
    return this.getDescendingScoresValueByCount(counts, 3, 1);
  }

  smallStraight(): number {
    const tallies = this.countDiceByValue();
    if (tallies[0] == 1 && tallies[1] == 1 && tallies[2] == 1 && tallies[3] == 1 && tallies[4] == 1) return 15;
    return 0;
  }

  largeStraight(): number {
    const [d1, d2, d3, d4, d5] = this.dice;
    var tallies;
    tallies = [0, 0, 0, 0, 0, 0, 0, 0];
    tallies[d1 - 1] += 1;
    tallies[d2 - 1] += 1;
    tallies[d3 - 1] += 1;
    tallies[d4 - 1] += 1;
    tallies[d5 - 1] += 1;
    if (tallies[1] == 1 && tallies[2] == 1 && tallies[3] == 1 && tallies[4] == 1 && tallies[5] == 1) return 20;
    return 0;
  }

  fullHouse(): number {
    const [d1, d2, d3, d4, d5] = this.dice;
    var tallies;
    var _2 = false;
    var i;
    var _2_at = 0;
    var _3 = false;
    var _3_at = 0;

    tallies = [0, 0, 0, 0, 0, 0, 0, 0];
    tallies[d1 - 1] += 1;
    tallies[d2 - 1] += 1;
    tallies[d3 - 1] += 1;
    tallies[d4 - 1] += 1;
    tallies[d5 - 1] += 1;

    for (i = 0; i != 6; i += 1)
      if (tallies[i] == 2) {
        _2 = true;
        _2_at = i + 1;
      }

    for (i = 0; i != 6; i += 1)
      if (tallies[i] == 3) {
        _3 = true;
        _3_at = i + 1;
      }

    if (_2 && _3) return _2_at * 2 + _3_at * 3;
    else return 0;
  }

  private countDiceByValue(): number[] {
    var counts = [0, 0, 0, 0, 0, 0];
    for (var i = 0; i != this.dice.length; ++i) {
      var die = this.dice[i];
      counts[die - 1]++;
    }
    return counts;
  }

  private areDiceAllTheSame(counts: number[]): boolean {
    return counts.includes(5);
  }

  private sumIfValueIs(value: number): number {
    return sum(this.dice.filter(d => d === value));
  }

  private getDescendingScoresValueByCount(counts: number[], count: number, limit: number): number {
    return this.getHighestValueByCount(counts, count, limit) * count;
  }

  private getHighestValueByCount(counts: number[], count: number, limit: number): number {
    const foundElements: number[] = [];
    for (let i = MAX_DICE_VALUE - 1; i >= 0; i--) {
      if (counts[i] >= count) {
        foundElements.push(i + 1);
        if (foundElements.length === limit) {
          return sum(foundElements);
        }
      }
    }

    return 0;
  }
}
