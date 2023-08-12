import { CSSProperties, memo } from 'react';

export type Direction = 'ne' | 'n' | 'nw' | 'w' | 'sw' | 's' | 'se' | 'e';

export const directions: Record<
  Direction,
  { top: `${number}%`; left: `${number}%`; cursor: CSSProperties['cursor'] }
> = {
  n: { top: '0%', left: '50%', cursor: 'ns-resize' },
  w: { top: '50%', left: '100%', cursor: 'ew-resize' },
  s: { top: '100%', left: '50%', cursor: 'ns-resize' },
  e: { top: '50%', left: '0%', cursor: 'ew-resize' },
  nw: { top: '0%', left: '100%', cursor: 'nesw-resize' },
  sw: { top: '100%', left: '100%', cursor: 'nwse-resize' },
  se: { top: '100%', left: '0%', cursor: 'nesw-resize' },
  ne: { top: '0%', left: '0%', cursor: 'nwse-resize' },
} as const;

export type ResizeDotProps = {
  direction: Direction;
  onDrag: (event: React.MouseEvent<HTMLSpanElement>, direction: Direction) => void;
  visible: boolean;
};

export const ResizeDot = memo(({ direction, onDrag, visible }: ResizeDotProps) => {
  return (
    <span
      onMouseDown={(e) => onDrag(e, direction)}
      style={{
        display: visible ? 'inline' : 'none',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: 'lightblue',

        ...directions[direction],
      }}
    ></span>
  );
});
