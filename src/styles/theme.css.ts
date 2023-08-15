import { createTheme, createVar } from '@vanilla-extract/css';

export { flatPalette, themes };
export type { Theme };

const [lightTheme, palette] = createTheme({
  primary: {},
  background: {},
  border: {},
  text: {},
  success: {},
  error: {},
  gray: {
    '1': '#333333',
    '2': '#4F4F4F',
    '3': '#828282',
    '4': '#BDBDBD',
    '5': '#E0E0E0',
    '6': '#F2F2F2',
  },
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  debug: {
    red: 'salmon',
    yellow: 'moccasin',
    green: 'lightgreen',
    blue: 'lightblue',
    purple: 'plum',
    white: 'white',
    black: 'black',
  },
});

const darkTheme = createTheme(palette, {
  primary: {},
  background: {},
  border: {},
  text: {},
  success: {},
  error: {},
  gray: {
    '1': '#333333',
    '2': '#4F4F4F',
    '3': '#828282',
    '4': '#BDBDBD',
    '5': '#E0E0E0',
    '6': '#F2F2F2',
  },
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  debug: {
    red: 'salmon',
    yellow: 'moccasin',
    green: 'lightgreen',
    blue: 'lightblue',
    purple: 'plum',
    white: 'white',
    black: 'black',
  },
});

type Theme = keyof typeof themes;

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

type CssVarFunction = ReturnType<typeof createVar>;
type CssVarMap = {
  [key: string]: CssVarMap | CssVarFunction;
};

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

const flatPalette = getFlatMap(palette);

function getFlatMap<Vars extends CssVarMap>(vars: Vars): Record<NestedKeyOf<Vars>, CssVarFunction> {
  return Object.fromEntries(traverse(vars)) as Record<NestedKeyOf<Vars>, CssVarFunction>;

  function traverse(vars: CssVarMap, prefix = ''): [string, ReturnType<typeof createVar>][] {
    return Object.entries(vars).flatMap(([colorName, value]) => {
      if (typeof value === 'string') {
        return [[`${prefix}${colorName}`, value]];
      }
      return traverse(value, `${prefix}${colorName}.`);
    });
  }
}

export const mediaQuery = {
  mobile: 'screen and (max-width: 576px)',
  tablet: 'screen and (max-width: 1024px)',
} as const;

export const basicTransition = 'all 150ms linear';
