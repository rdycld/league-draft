import { globalStyle, style } from '@vanilla-extract/css';
import { sprinkles } from 'styles/sprinkles.css';

globalStyle('*', {
  boxSizing: 'border-box',
  transition: 'background-color 150ms ease-in',
});

globalStyle('html, body', {
  height: '100%',
});

globalStyle('body', {
  // Help prevent unstyled text/SVG
  color: 'hotpink',
  margin: 0,
});

globalStyle('#__next', {
  display: 'flex',
  flex: '1 0 auto',
  minHeight: '100%',
});

globalStyle('button', {
  all: 'unset',
});

export const page = style([
  sprinkles({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    background: 'background.primary',
  }),
  { flex: '1 0 auto' },
]);
