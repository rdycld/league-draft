export function pick<T, K extends keyof T>(object: T, keys: readonly K[]): Pick<T, K> {
  const obj = {} as any;

  keys.forEach((key) => {
    obj[key] = object[key];
  });

  return obj as Pick<T, K>;
}
