import { MAX_DICE_VALUE } from './constants';
import { sum, tallies } from './utils';

export class DiceTally {
  private tallies: number[];
  constructor(dice: number[]) {
    this.tallies = tallies(dice, MAX_DICE_VALUE);
  }

  contains(count: number): boolean {
    return this.tallies.includes(count);
  }

  count(value: number): number {
    return this.tallies[value - 1];
  }

  getDescendingScoresValueByCount(count: number, limit: number): number {
    return this.getHighestValueByCount(count, limit) * count;
  }

  private getHighestValueByCount(count: number, limit: number): number {
    const foundElements: number[] = [];
    for (let i = MAX_DICE_VALUE - 1; i >= 0; i--) {
      if (this.tallies[i] < count) {
        continue;
      }

      foundElements.push(i + 1);
      if (foundElements.length === limit) {
        return sum(foundElements);
      }
    }

    return 0;
  }

  hasStraightFromTo(from: number, to: number): boolean {
    return this.tallies.slice(from - 1, to - 1).every((t) => t === 1);
  }
}
