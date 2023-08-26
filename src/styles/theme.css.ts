import { createTheme, createVar } from '@vanilla-extract/css';

export { flatPalette, themes };
export type { Theme };



const [lightTheme, palette] = createTheme({
  background: {
    neutral: {
      primary: '#FFFFFF',
      secondary: '#FAFAFA',
      tertiary: '#F5F5F5',
      muted: '#D4D4D4',
      inverse: '#0A0A0A',
    },
    accent: {
      default: '600',
      pressed: '800',
      disabled: '200',
    },
    success: {
      highContrast: '600',
      lowContrast: '50',
    },
    warning: {
      highContrast: '600',
      lowContrast: '50',
    },
    error: {
      highContrast: '600',
      lowContrast: '50',
    },
  },
  foreground: {
    neutral: {
      primary: '1000',
      secondary: '700',
      muted: '400',
      onColor: '0',
    },
    accent: {
      primary: '800',
      secondary: '600',
      muted: '400',
      onColor: '100',
    },
    success: {
      primary: '800',
      secondary: '600',
      onColor: '100',
    },
    warning: {
      primary: '800',
      secondary: '600',
      onColor: '100',
    },
    error: {
      primary: '800',
      secondary: '600',
      onColor: '100',
    },
  },
  border: {
    default: '',
    subtle: '',
    focus: '',
    accent: {
      default: '',
      subtle: '',
      dark: '',
    },
    system: {
      success: '',
      error: '',
      warning: '',
    },
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
  background: {
    neutral: {
      primary: '#FFFFFF',
      secondary: '#F6F7F7',
      tertiary: '#EAEAEB',
      muted: '#AAABAE',
      inverse: '#070809',
    },
    accent: {
      default: '',
      pressed: '',
      disabled: '',
    },
    success: {
      highContrast: '#27D09D',
      lowContrast: '#52D9B1',
    },
    warning: {
      highContrast: '#27D09D',
      lowContrast: '#52D9B1',
    },
    error: {
      highContrast: '#27D09D',
      lowContrast: '#52D9B1',
    },
  },
  foreground: {
    neutral: {
      primary: '#FFFFFF',
      secondary: '#F6F7F7',
      muted: '#AAABAE',
      onColor: '#070809',
    },
    accent: {
      primary: '',
      secondary: '',
      muted: '',
      onColor: '',
    },
    success: {
      primary: '#27D09D',
      secondary: '#52D9B1',
      onColor: '',
    },
    warning: {
      primary: '#27D09D',
      secondary: '#52D9B1',
      onColor: '',
    },
    error: {
      primary: '#27D09D',
      secondary: '#52D9B1',
      onColor: '',
    },
  },
  border: {
    default: '',
    subtle: '',
    focus: '',
    accent: {
      default: '',
      subtle: '',
      dark: '',
    },
    system: {
      success: '',
      error: '',
      warning: '',
    },
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
