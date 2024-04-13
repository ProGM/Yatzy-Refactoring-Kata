export function sum<T>(arr: T[]): number {
  return arr.reduce((acc, curr) => acc + Number(curr), 0)
}