export type PrefixKeys<Prefix extends string, Type> = {
  [Key in keyof Type & string as `${Prefix}${Key}`]: Type[Key];
};
