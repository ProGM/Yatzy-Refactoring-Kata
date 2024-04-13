export function sum<T>(arr: T[]): number {
  return arr.reduce((acc, curr) => acc + Number(curr), 0)
}

export function tallies(items: number[], size: number): number[] {
  const tallies = Array(size).fill(0);
  for (let i = 0; i != items.length; ++i) {
    tallies[items[i] - 1]++;
  }
  return tallies;
}
