export const gcd = (a: number, b: number): number => {
  if (a === 0) return b;
  return gcd(b % a, a);
};

export function lcm(a: number, b: number) {
  return !a || !b ? 0 : Math.abs((a * b) / gcd(a, b));
}

export const isLetter = (c: string): boolean => {
  return c.toLowerCase() != c.toUpperCase();
}

export function hasDuplicates<Type>(array: Type[]): boolean {
  return (new Set(array)).size !== array.length;
}