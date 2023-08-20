import { forwardRef } from 'react';

import * as styles from './Box.css';
import { CommonProps } from './CommonProps';

import {
  BleedProps,
  BorderProps,
  BorderRadiusProps,
  getBleed,
  getBorder,
  getBorderRadius,
  getLayout,
  getLookAndFeel,
  getMargin,
  getPadding,
  getSizeStyle,
  LayoutProps,
  LookAndFeelProps,
  MarginProps,
  PaddingProps,
  SizeProps,
} from 'styles/mixins';
import { concat } from 'utils/concat';

export const Box = forwardRef<
  HTMLDivElement,
  {
    children?: React.ReactNode;
    style?: React.CSSProperties;
  } & BleedProps &
    BorderProps &
    BorderRadiusProps &
    CommonProps &
    LayoutProps &
    LookAndFeelProps &
    PaddingProps &
    MarginProps &
    SizeProps
>(function Box(props, ref) {
  return (
    <div
      ref={ref}
      className={concat(
        styles.box,
        getBleed(props),
        getBorder(props),
        getBorderRadius(props),
        getLayout(props),
        getLookAndFeel(props),
        getPadding(props),
        getMargin(props),
        props.className,
      )}
      style={{ ...getSizeStyle(props), ...props.style }}
    >
      {props.children}
    </div>
  );
});
