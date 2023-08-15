export type GetSprinkles<SprinklesFunction extends (...args: any[]) => any> =
  Parameters<SprinklesFunction>[0];
