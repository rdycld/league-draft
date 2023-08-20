import { style } from '@vanilla-extract/css';

import { sprinkles } from 'styles/sprinkles.css';
import { basicTransition } from 'styles/theme.css';

export const root = style([
  sprinkles({
    background: 'background.quarternary',
    borderRadius: 'circle',
  }),
  {
    boxShadow: '0 2px 10px primary.default',
    cursor: 'pointer',
    height: '25px',
    position: 'relative',
    width: '42px',
    ':focus': {
      boxShadow: '0 0 0 2px black',
    },
    selectors: {
      '&[data-state="checked"]': {
        backgroundColor: 'black',
      },
    },
  },
]);

//TODO outsource bg images as optional prop
export const thumb = style([
  sprinkles({
    borderRadius: 'circle',
  }),
  {
    backgroundImage: "url('/sun.svg')",
    backgroundPosition: 'center',
    backgroundSize: '100%',
    display: 'block',
    height: '23px',
    transform: 'translateX(2px)',
    transition: basicTransition,
    width: '23px',
    selectors: {
      '&[data-state="checked"]': {
        backgroundImage: "url('/moon.png')",
        transform: 'translateX(19px)',
      },
    },
  },
]);
