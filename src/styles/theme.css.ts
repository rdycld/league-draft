import { createTheme, createVar } from '@vanilla-extract/css';

export { flatPalette, themes };
export type { Theme };

const [lightTheme, palette] = createTheme({
  primary: {
    default: '#1445F5',
    hover: '#436AF7',
    focus: '#728FF9',
    disabled: '#D3D4D5',
    inverted: {
      default: '#E8ECFE',
      focus: '#A1B5FB',
    },
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#F6F7F7',
    tertiary: '#EAEAEB',
    quarternary: '#AAABAE',
    inverted: '#070809',
    disabled: '#D3D4D5',
  },
  border: {
    ui: '#AAABAE',
    layout: '#EAEAEB',
    active: '#1445F5',
    focus: '#A1B5FB',
    error: '#DE3672',
  },
  text: {
    primary: '#070809',
    secondary: '#636669',
    tertiary: '#7C7F82',
    label: '#FFFFFF',
    link: '#1445F5',
    disabled: '#929497',
    error: '#B22B5B',
  },
  success: {
    default: '#27D09D',
    hover: '#52D9B1',
    focus: '#7DE3C4',
  },
  error: {
    default: '#DE3672',
    hover: '#E55E8E',
    focus: '#EB86AA',
  },
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
  primary: {
    default: '#0C2993',
    hover: '#0C2993',
    focus: '#1445F5',
    disabled: '#2A2E34',
    inverted: {
      default: '#040E31',
      focus: '#0C2993',
    },
  },
  background: {
    primary: '#08090A',
    secondary: '#191C1F',
    tertiary: '#22252A',
    quarternary: '#2A2E34',
    inverted: '#F6F7F7',
    disabled: '#2A2E34',
  },
  border: {
    ui: '#22252A',
    layout: '#191C1F',
    active: '#1445F5',
    focus: '#436AF7',
    error: '#DE3672',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#D3D4D5',
    tertiary: '#BEBFC0',
    label: '#E9EAEA',
    link: '#728FF9',
    disabled: '#636669',
    error: '#DE3672',
  },
  success: {
    default: '#27D09D',
    hover: '#52D9B1',
    focus: '#7DE3C4',
  },
  error: {
    default: '#DE3672',
    hover: '#B22B5B',
    focus: '#852044',
  },
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

