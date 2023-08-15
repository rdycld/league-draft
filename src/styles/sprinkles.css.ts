import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { flatPalette } from './theme.css';

import { identity } from 'utils/identity';
import { mapToObject } from 'utils/mapToObject';
import { GetSprinkles } from 'utils/sprinkles';

export type Sprinkles = GetSprinkles<typeof sprinkles>;

const borderStyles = ['solid', 'dashed'] as const;
const borderWidths = [0, 1, 2] as const;

// flex-* are ok for the grid too (see: https://www.w3.org/TR/css-align-3/#positional-values)
const flexAlignments = {
  'space-between': 'space-between',
  bottom: 'flex-end',
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
  top: 'flex-start',
};

const radii = {
  ...mapToObject([0, 1, 2, 4, 12, 16], identity<number>),
  circle: '10000px',
};

export type Space = (typeof spaces)[number];

export const spaces = [0, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 64, 80, 160, 'auto'] as const;

const conditions = {
  conditions: {
    default: {},
    hover: { selector: '&:hover:not(:disabled)' },
    focus: { selector: '&:focus:not(:disabled)' },
    active: { selector: '&:active:not(:disabled)' },
    disabled: { selector: '&:disabled' },
    focusWithin: { selector: '&:focus-within:not(:disabled)' },
  },
  defaultCondition: 'default',
} as const;

const propertiesWithConditions = defineProperties({
  ...conditions,
  properties: {
    background: flatPalette,
    border: ['none'],
    borderBottomColor: flatPalette,
    borderLeftColor: flatPalette,
    borderRightColor: flatPalette,
    borderTopColor: flatPalette,
    color: flatPalette,
    cursor: ['default', 'pointer'],
    fill: flatPalette,
    outline: ['none'],
    outlineColor: flatPalette,
    stroke: flatPalette,
    userSelect: ['none', 'all'],
  },
  shorthands: {
    borderColor: ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'],
    borderXColor: ['borderLeftColor', 'borderRightColor'],
    borderYColor: ['borderTopColor', 'borderBottomColor'],
  },
});

const propertiesWithoutConditions = defineProperties({
  properties: {
    alignItems: { ...flexAlignments, stretch: 'stretch' },
    bleedBottom: mapToObject(spaces, (space) => ({ marginBottom: -space })),
    bleedLeft: mapToObject(spaces, (space) => ({ marginLeft: -space })),
    bleedRight: mapToObject(spaces, (space) => ({ marginRight: -space })),
    bleedTop: mapToObject(spaces, (space) => ({ marginTop: -space })),
    borderBottomLeftRadius: radii,
    borderBottomRightRadius: radii,
    borderBottomStyle: borderStyles,
    borderBottomWidth: borderWidths,
    borderLeftStyle: borderStyles,
    borderLeftWidth: borderWidths,
    borderRightStyle: borderStyles,
    borderRightWidth: borderWidths,
    borderTopLeftRadius: radii,
    borderTopRightRadius: radii,
    borderTopStyle: borderStyles,
    borderTopWidth: borderWidths,
    display: ['inline', 'inline-block', 'block', 'flex', 'inline-flex', 'grid'],
    flexDirection: ['column', 'row', 'row-reverse'],
    gap: spaces,
    justifyContent: flexAlignments,
    outlineStyle: borderStyles,
    outlineWidth: borderWidths,
    paddingBottom: spaces,
    paddingLeft: spaces,
    paddingRight: spaces,
    paddingTop: spaces,
    marginTop: spaces,
    marginRight: spaces,
    marginBottom: spaces,
    marginLeft: spaces,
  },
  shorthands: {
    bleed: ['bleedTop', 'bleedRight', 'bleedBottom', 'bleedLeft'],
    bleedX: ['bleedLeft', 'bleedRight'],
    bleedY: ['bleedTop', 'bleedBottom'],
    borderRadius: [
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomRightRadius',
      'borderBottomLeftRadius',
    ],
    borderBottomRadius: ['borderBottomRightRadius', 'borderBottomLeftRadius'],
    borderLeftRadius: ['borderTopLeftRadius', 'borderBottomLeftRadius'],
    borderRightRadius: ['borderTopRightRadius', 'borderBottomRightRadius'],
    borderTopRadius: ['borderTopLeftRadius', 'borderTopRightRadius'],
    borderStyle: ['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'],
    borderXStyle: ['borderLeftStyle', 'borderRightStyle'],
    borderYStyle: ['borderTopStyle', 'borderBottomStyle'],
    borderWidth: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'],
    borderXWidth: ['borderLeftWidth', 'borderRightWidth'],
    borderYWidth: ['borderTopWidth', 'borderBottomWidth'],
    padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
  },
});

export const sprinkles = createSprinkles(propertiesWithConditions, propertiesWithoutConditions);
