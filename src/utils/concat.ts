export function concat(...strings: (string | undefined)[]): string {
  return strings.reduce<string>(
    (sum, string) => (!string ? sum : sum ? `${sum} ${string}` : string),
    '',
  );
}
