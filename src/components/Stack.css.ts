import { createVar, globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { spaces } from 'styles/sprinkles.css';
import { mapToObject } from 'utils/mapToObject';

export type Flex = keyof typeof flexVariants;
export type Gap = keyof typeof gapVariants;

const parentGapVar = createVar();
export const column = style({ display: 'flex', flexDirection: 'column' });
export const row = style({ display: 'flex', flexDirection: 'row' });
export const fluid = style({ display: 'flex' });

globalStyle(`${column} > *`, { minHeight: 0, flex: '0 0 auto', position: 'relative' });
globalStyle(`${row} > *`, { minWidth: 0, flex: '0 0 auto', position: 'relative' });
globalStyle(`${fluid} > *`, { width: '100%' });

const flexValues = ['content', 'min-content', 'max-content', 1, 2, 3, 4, 5, 6] as const;

export const flexVariants = styleVariants(
  mapToObject(flexValues, (flex) => ({
    flex:
      flex === 'content'
        ? '0 0 auto'
        : flex === 'min-content'
        ? '1 0 auto'
        : flex === 'max-content'
        ? '0 1 auto'
        : `${flex} ${flex} ${calc(parentGapVar).multiply(flex - 1)}`,
  })),
);

export const gapVariants = styleVariants(mapToObject(spaces, (space) => ({ gap: space })));

for (const space of spaces) {
  globalStyle(`${gapVariants[space]} > *`, {
    vars: { [parentGapVar]: `${space}px` },
  });
}

const negativeParentGap = calc(parentGapVar).multiply(-1);

export const columnGap = style({
  marginTop: negativeParentGap.toString(),
  marginBottom: negativeParentGap.toString(),
  ':first-child': { marginTop: 0 },
  ':last-child': { marginBottom: 0 },
});
globalStyle(`${columnGap} + ${columnGap}`, { marginTop: 0 });

export const rowGap = style({
  marginLeft: negativeParentGap.toString(),
  marginRight: negativeParentGap.toString(),
  ':first-child': { marginLeft: 0 },
  ':last-child': { marginRight: 0 },
});
globalStyle(`${rowGap} + ${rowGap}`, { marginLeft: 0 });

export const fluidGap = style({ flex: '1 0 auto' });
