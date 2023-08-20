import { Box } from './Box';
import { CommonProps } from './CommonProps';
import * as styles from './Stack.css';

import {
  AlignmentProps,
  BleedProps,
  BorderProps,
  BorderRadiusProps,
  LookAndFeelProps,
  PaddingProps,
  SizeProps,
} from 'styles/mixins';
import { Sprinkles } from 'styles/sprinkles.css';
import { concat } from 'utils/concat';

type StackProps = {
  children: React.ReactNode;
  gap?: styles.Gap;
} & AlignmentProps &
  BleedProps &
  BorderProps &
  BorderRadiusProps &
  CommonProps &
  LookAndFeelProps &
  PaddingProps &
  SizeProps;

export function Column(props: StackProps) {
  const { className, gap = 0 } = props;
  return (
    <Box
      {...props}
      className={concat(styles.column, styles.gapVariants[gap], className)}
      direction="column"
    />
  );
}
Column.Gap = getGap(true);

export function Row(props: StackProps) {
  const { className, gap = 0 } = props;
  return (
    <Box
      {...props}
      className={concat(styles.row, styles.gapVariants[gap], className)}
      direction="row"
    />
  );
}
Row.Gap = getGap(false);

/**
 * Wraps children in such a way that they take a given part (default: 1) of the flex space remaining
 * after all content-sized elements are considered.
 *
 * An example with one content-sized element and a Fluid element:
 *
 *     |-------------------Container--------------------|
 *     |contentSized|---------------Fluid---------------|
 *
 * An example with one content-sized element and two Fluid elements:
 *
 *     |-------------------Container--------------------|
 *     |contentSized|------Fluid------|------Fluid------|
 *
 * The extra wrapper element in Fluid prevents flex from messing up because of box-sizing being
 * ignored when calculating the base size. For example, if `flex: 1 1 0` was set on an element with
 * `padding-left: 4px`, the resulting flex-base would really be 4px.
 *
 * See: https://www.w3.org/TR/css-flexbox-1/#algo-main-item
 */
export function Fluid(props: { children?: React.ReactNode; flex?: styles.Flex } & CommonProps) {
  const { className, flex = 1 } = props;
  return <Box {...props} className={concat(styles.fluid, styles.flexVariants[flex], className)} />;
}

function getGap(isColumn: boolean) {
  const gapClassName = isColumn ? styles.columnGap : styles.rowGap;
  const sizeProperty = isColumn ? 'height' : 'width';
  return function Gap({ fluid, gap = 0 }: { fluid?: boolean; gap?: Sprinkles['gap'] }) {
    return (
      <div
        className={concat(gapClassName, fluid ? styles.fluidGap : '')}
        style={{ [sizeProperty]: gap }}
      />
    );
  };
}
