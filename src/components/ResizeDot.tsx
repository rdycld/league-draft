import { CSSProperties, memo } from 'react';

export type DotPlacement = 'ne' | 'n' | 'nw' | 'w' | 'sw' | 's' | 'se' | 'e';

export const placements: Record<
  DotPlacement,
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
  placement: DotPlacement;
};

export const ResizeDot = memo(({ placement }: ResizeDotProps) => {
  return (
    <span
      style={{
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: 'lightblue',
        ...placements[placement],
      }}
    ></span>
  );
});
