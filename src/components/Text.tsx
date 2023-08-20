import { CommonProps } from './CommonProps';
import { TextSprinkles, textSprinkles } from './Text.css';

import { Sprinkles, sprinkles } from 'styles/sprinkles.css';
import { concat } from 'utils/concat';

type TextProps = LayoutProps & SpanProps;

type LayoutProps = {
  align?: TextSprinkles['textAlign'];
  inline?: boolean;
  noWrap?: boolean;
};

type SpanProps = CommonProps & {
  children: React.ReactNode;
  color?: Sprinkles['color'];
  decoration?: TextSprinkles['textDecoration'];
  transform?: TextSprinkles['textTransform'];
  title?: string;
};

export function Headline({ level, ...props }: { level: 1 | 2 | 3 | 4 | 5 } & TextProps) {
  return <BaseText font={`headline${level}`} {...props} />;
}

export function Subtitle({ level, ...props }: { level: 1 | 2 } & TextProps) {
  return <BaseText font={`subtitle${level}`} {...props} />;
}

export function Text({ level, ...props }: { level: 1 | 2 | 3 } & TextProps) {
  return <BaseText font={`body${level}`} {...props} />;
}

export function Label({ level, ...props }: { level: 1 | 2 | 3 | 4 } & TextProps) {
  return <BaseText font={`label${level}`} {...props} />;
}

export function Span(props: SpanProps) {
  return <BaseText {...props} inline />;
}

function BaseText(props: { font?: TextSprinkles['font'] } & TextProps) {
  const { align, children, className, color, decoration, font, inline, noWrap, title, transform } =
    props;
  return (
    // The element is `span` because it can be inside anything
    <span
      className={concat(
        sprinkles({ color, display: inline ? 'inline-block' : 'block' }),
        textSprinkles({
          font,
          noWrap: noWrap ? 'true' : undefined,
          textAlign: align,
          textDecoration: decoration,
          textTransform: transform,
        }),
        className,
      )}
      title={title}
    >
      {children}
    </span>
  );
}
