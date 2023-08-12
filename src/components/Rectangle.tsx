import React, { ElementRef, RefObject, memo, useRef } from 'react';
import { Shape } from '../App';
import { Direction, ResizeDot, directions } from './ResizeDot';

export type Props = Shape & {
  index: number;
  onDrag: (event: React.MouseEvent<HTMLDivElement>, index: number) => void;
  onResize: (
    event: React.MouseEvent<HTMLSpanElement>,
    rectangleRef: RefObject<HTMLDivElement>,
    direction: Direction,
    index: number,
  ) => void;
};

export const Rectangle = memo(function Rectangle({
  x,
  y,
  z,
  width,
  height,
  index,
  onDrag,
  onResize,
  selected,
}: Props) {
  const rectangleRef = useRef<ElementRef<'div'>>(null);

  const handleResize = (event: React.MouseEvent<HTMLSpanElement>, direction: Direction) => {
    event.stopPropagation();
    if (!rectangleRef.current) {
      return;
    }
    onResize(event, rectangleRef, direction, index);
  };

  return (
    <div
      ref={rectangleRef}
      onMouseDown={(e) => onDrag(e, index)}
      style={{
        userSelect: 'none',
        width,
        height,
        top: y,
        left: x,
        zIndex: z,
        position: 'absolute',
        border: '1px solid black',
      }}
    >
      <p>top: {y}</p>
      <p>left: {x}</p>
      <p>selected: {'' + selected}</p>
      {Object.keys(directions).map((key) => (
        <ResizeDot key={key} direction={key} visible={selected} onDrag={handleResize} />
      ))}
    </div>
  );
});
