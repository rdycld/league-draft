export function assert<T>(val: T, message?: string): asserts val {
  if (!val) {
    throw new Error(message ?? `expected ${typeof val}, got: ${val}`);
  }
}
