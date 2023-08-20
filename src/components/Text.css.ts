import { CSSProperties } from '@vanilla-extract/css';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { GetSprinkles } from 'utils/sprinkles';

export type TextSprinkles = GetSprinkles<typeof textSprinkles>;

export const textProperties = defineProperties({
  properties: {
    font: {
      headline1: getFont(48, 1.25, 700),
      headline2: getFont(40, 1.25, 700),
      headline3: getFont(32, 1.25, 700),
      headline4: getFont(24, 1.25, 700),
      headline5: getFont(20, 1.25, 700),
      subtitle1: getFont(16, 1.25, 700),
      subtitle2: getFont(14, 1.25, 700),
      body1: getFont(20, 1.5, 500),
      body2: getFont(16, 1.5, 500),
      body3: getFont(14, 1.5, 500),
      label1: getFont(20, 24, 400),
      label2: getFont(16, 20, 400),
      label3: getFont(14, 20, 400),
      label4: getFont(12, 18, 400),
    },
    noWrap: {
      true: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    },
    textAlign: ['left', 'center', 'right'],
    textDecoration: ['line-through', 'underline'],
    textTransform: ['capitalize', 'uppercase', 'lowercase'],
  },
});

export const textSprinkles = createSprinkles(textProperties);

function getFont(fontSize: number, lineHeight: number, fontWeight: number) {
  return {
    fontSize,
    lineHeight: `${Math.round(lineHeight <= 2 ? lineHeight * fontSize : lineHeight)}px`,
    fontWeight,
  } satisfies CSSProperties;
}
