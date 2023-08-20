import { style } from '@vanilla-extract/css';

export const box = style({
  /**
   * Having a line height greater than 0 might result in a broken layout;
   * use the Text component when dealing with the text.
   */
  lineHeight: 0,
  position: 'relative',
});
