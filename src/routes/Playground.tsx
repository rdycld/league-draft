import React, { useState, useCallback, useRef, ElementRef, RefObject } from 'react';
import { pick } from '../utils/pick';
import { drag, calcDrag, DragOptions } from '../utils/drag';
import { Rectangle } from '../components/Rectangle';
import { Direction } from '../components/ResizeDot';
import { getResizeDimensions } from '../utils/getResizeDimensions';
import { getDragCoordinates } from '../utils/getDragCoordinates';

export type Shape = {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  selected: boolean;
};

export function Playground() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const containerRef = useRef<ElementRef<'div'>>(null);

  const addShape = () => {
    setShapes((p) => [
      ...p,
      { x: 0, y: 0, z: p.length + 1, width: 200, height: 200, selected: true },
    ]);
  };

  const handleDrag = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, index: number, options?: DragOptions) => {
      if (!containerRef.current) {
        return;
      }

      const rectangle = event.currentTarget.getBoundingClientRect();
      const container = containerRef.current.getBoundingClientRect();
      const initialPoint = pick(event, ['clientX', 'clientY']);

      const onDrag = (event: PointerEvent) => {
        const drag = calcDrag(event, initialPoint);

        const coordinates = getDragCoordinates(rectangle, container, drag);

        setShapes((p) =>
          p.map((shape, i) => {
            return i === index
              ? {
                  ...shape,
                  ...coordinates,
                  z: 2,
                }
              : { ...shape, z: 1 };
          }),
        );
      };

      drag(event, {
        onDrag,
        ...options,
      });
    },
    [],
  );

  const handleResize = useCallback(
    (
      event: React.MouseEvent<HTMLSpanElement>,
      rectangleRef: RefObject<HTMLDivElement>,
      direction: Direction,
      index: number,
    ) => {
      if (!containerRef.current) {
        return;
      }

      const initialPoint = pick(event, ['clientX', 'clientY']);
      const rectangle = rectangleRef.current!.getBoundingClientRect();
      const container = containerRef.current.getBoundingClientRect();

      const onDrag = (event: PointerEvent) => {
        const drag = calcDrag(event, initialPoint);

        const dimensios = getResizeDimensions(rectangle, container, drag, direction);

        setShapes((p) =>
          p.map((shape, i) => {
            return i === index
              ? {
                  ...shape,
                  ...dimensios,
                }
              : shape;
          }),
        );
      };

      drag(event, {
        onDrag,
      });
    },
    [],
  );

  return (
    <>
      <div
        ref={containerRef}
        style={{
          margin: 100,
          width: 800,
          height: 800,
          position: 'relative',
          border: '1px solid black',
        }}
      >
        {shapes.map((shape, index) => (
          <Rectangle
            key={index}
            {...shape}
            index={index}
            onDrag={handleDrag}
            onResize={handleResize}
          />
        ))}
      </div>
      <button onClick={addShape}>add rect</button>
    </>
  );
}
