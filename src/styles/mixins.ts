import { LiteralUnion } from 'type-fest';

import { Space, Sprinkles, sprinkles } from './sprinkles.css';

import { pick } from 'utils/pick';
import { PrefixKeys } from 'utils/PrefixKeys';

type AlignX = 'left' | 'center' | 'right';
type AlignY = 'top' | 'center' | 'bottom';

export type AlignmentProps = {
  align?: AlignX & AlignY;
  alignX?: AlignX | 'space-between';
  alignY?: AlignY | 'space-between';
};

export type BleedProps = Pick<Sprinkles, (typeof bleedProps)[number]>;

export type BorderProps = {
  border?: Border;
  borderX?: Border;
  borderY?: Border;
  borderTop?: Border;
  borderRight?: Border;
  borderBottom?: Border;
  borderLeft?: Border;
  outline?: Border;
};
type Border = BorderColor | [BorderColor, BorderWidth?, BorderStyle?];
type BorderColor = NonNullable<Sprinkles['borderTopColor']>;
type BorderStyle = NonNullable<Sprinkles['borderTopStyle']>;
type BorderWidth = NonNullable<Sprinkles['borderTopWidth']>;

export type BorderRadiusProps = Pick<Sprinkles, (typeof borderRadiusProps)[number]>;

export type LayoutProps = AlignmentProps & {
  direction?: Sprinkles['flexDirection'];
};

export type LookAndFeelProps = {
  background?: Sprinkles['background'];
  clickable?: boolean;
  color?: Sprinkles['color'];
  disabled?: boolean;
  noSelect?: boolean;
};

export type PaddingProps = Pick<Sprinkles, (typeof paddingProps)[number]>;
export type MarginProps = Pick<Sprinkles, (typeof marginProps)[number]>;

type AnyNumberButSpacePreferred = LiteralUnion<Space, number>;
export type SizeProps = Partial<
  Record<SizePropName, (typeof sizes)[number] | AnyNumberButSpacePreferred>
>;

const bleedProps = [
  'bleed',
  'bleedX',
  'bleedY',
  'bleedTop',
  'bleedRight',
  'bleedBottom',
  'bleedLeft',
] as const;
export function getBleed(props: BleedProps) {
  return sprinkles(pick(props, bleedProps));
}

export function getBorder(props: BorderProps) {
  return sprinkles({
    ...unpackBorder(props.border, 'border'),
    ...unpackBorder(props.borderX, 'borderX'),
    ...unpackBorder(props.borderY, 'borderY'),
    ...unpackBorder(props.borderTop, 'borderTop'),
    ...unpackBorder(props.borderRight, 'borderRight'),
    ...unpackBorder(props.borderBottom, 'borderBottom'),
    ...unpackBorder(props.borderLeft, 'borderLeft'),
    ...unpackBorder(props.outline, 'outline'),
  });
}

function unpackBorder<Prefix extends string>(border: Border | undefined, prefix: Prefix) {
  if (border === undefined) {
    return undefined;
  }
  const [color, width = 1, style = 'solid'] = Array.isArray(border) ? border : [border];
  return {
    [`${prefix}Color`]: color,
    [`${prefix}Width`]: width,
    [`${prefix}Style`]: style,
  } as PrefixKeys<Prefix, { Color: BorderColor; Width: BorderWidth; Style: BorderStyle }>;
}

const borderRadiusProps = [
  'borderRadius',
  'borderTopRadius',
  'borderRightRadius',
  'borderBottomRadius',
  'borderLeftRadius',
  'borderTopRightRadius',
  'borderTopLeftRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
] as const;
export function getBorderRadius(props: BorderRadiusProps) {
  return sprinkles(pick(props, borderRadiusProps));
}

export function getLayout(props: LayoutProps) {
  const { align, alignX = align, alignY = align, direction } = props;
  const display = alignX || alignY || direction ? 'flex' : undefined;
  const flexDirection = display ? direction ?? defaultDirection : undefined;
  return sprinkles({
    alignItems: flexDirection === 'column' ? alignX : alignY,
    display,
    flexDirection,
    justifyContent: flexDirection === 'column' ? alignY : alignX,
  });
}

const defaultDirection = 'row';

export function getLookAndFeel(props: LookAndFeelProps) {
  return sprinkles({
    background: props.background,
    color: props.color,
    cursor: props.disabled ? 'default' : props.clickable ? 'pointer' : undefined,
    userSelect: props.noSelect || props.disabled || props.clickable ? 'none' : undefined,
  });
}

const paddingProps = [
  'padding',
  'paddingX',
  'paddingY',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
] as const;
export function getPadding(props: PaddingProps) {
  return sprinkles(pick(props, paddingProps));
}

const marginProps = [
  'margin',
  'marginX',
  'marginY',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
] as const;

export function getMargin(props: MarginProps) {
  return sprinkles(pick(props, marginProps));
}

type SizePropName =
  | 'size'
  | 'width'
  | 'height'
  | 'minWidth'
  | 'minHeight'
  | 'maxWidth'
  | 'maxHeight';
const sizes = ['100%', '100vh', '100vw'] as const;
/**
 * Instead of sprinkles, plain styles are used to simplify the handling of numbers.
 *
 * Even though arbitrary numbers should be discouraged from being used as component dimensions (as
 * most cases they can and should be derived from the content and padding), there are some
 * appropriate usecases. Since sprinkles only deal with predefined values, the only way to allow an
 * arbitrary number as a value would be to use a custom CSS property. This, however, is a very
 * cumbersome thing to implement, so until it's absolutely necessary, let's stick with plain styles.
 */
export function getSizeStyle({
  size,
  width = size,
  height = size,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
}: SizeProps) {
  return {
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    overflowX: maxWidth !== undefined ? 'auto' : undefined,
    overflowY: maxHeight !== undefined ? 'auto' : undefined,
  } as const;
}
