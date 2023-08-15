export function mapToObject<Key extends string | number, Value>(
  keys: readonly Key[],
  map: (key: Key) => Value,
) {
  return Object.fromEntries(keys.map((key) => [key, map(key)])) as Record<Key, Value>;
}
