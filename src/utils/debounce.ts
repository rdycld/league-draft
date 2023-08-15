type GetParams<T extends (...parmas: any[]) => any> = T extends (...params: infer Params) => unknown
  ? Params
  : never;

export function debounce<T extends (...parmas: any[]) => any>(func: T, timeout?: number) {
  let timer: NodeJS.Timeout;
  return ((...args: GetParams<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      //@ts-expect-error 123
      func.apply(this, args);
    }, timeout || 400);
  }) as T;
}
