import { useState, useCallback, useRef, ElementRef, RefObject } from 'react';
import { pick } from './utils/pick';
import { drag, calcDrag, DragOptions, snapToEdge } from './utils/drag';
import { Rectangle } from './components/Rectangle';
import { Direction } from './components/ResizeDot';

export type Shape = {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  selected: boolean;
};

function App() {
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

      const currentShape = event.currentTarget.getBoundingClientRect();
      const containerBoundingRect = containerRef.current.getBoundingClientRect();
      const initialPoint = pick(event, ['clientX', 'clientY']);

      const onDrag = (event: PointerEvent) => {
        const travel = calcDrag(event, initialPoint);

        const { snapX, snapY } = snapToEdge(currentShape, containerBoundingRect, travel);

        setShapes((p) =>
          p.map((shape, i) => {
            return i === index
              ? {
                  ...shape,
                  x: snapX ?? currentShape.x + travel.x - containerBoundingRect.x,
                  y: snapY ?? currentShape.y + travel.y - containerBoundingRect.y,
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
      const rectangleBoundingRect = rectangleRef.current!.getBoundingClientRect();
      const containerBoundingRect = containerRef.current.getBoundingClientRect();

      const onDrag = (event: PointerEvent) => {
        const travel = calcDrag(event, initialPoint);

        const { snapTop, snapRight, snapBottom, snapLeft } = snapToEdge(
          rectangleBoundingRect,
          containerBoundingRect,
          travel,
        );

        switch (direction) {
          case 'n':
            setShapes((p) =>
              p.map((shape, i) => {
                return i === index
                  ? {
                      ...shape,
                      y: snapTop ? 0 : rectangleBoundingRect.y + travel.y - containerBoundingRect.y,
                      height: snapTop
                        ? rectangleBoundingRect.bottom - containerBoundingRect.y
                        : rectangleBoundingRect.height - travel.y,
                    }
                  : shape;
              }),
            );
            break;
          case 'w':
            setShapes((p) =>
              p.map((shape, i) => {
                return i === index
                  ? {
                      ...shape,
                      width: snapRight
                        ? containerBoundingRect.width - shape.x
                        : rectangleBoundingRect.width + travel.x,
                    }
                  : shape;
              }),
            );
            break;
          case 's':
            setShapes((p) =>
              p.map((shape, i) => {
                return i === index
                  ? {
                      ...shape,
                      height: snapBottom
                        ? containerBoundingRect.height - shape.y
                        : rectangleBoundingRect.height + travel.y,
                    }
                  : shape;
              }),
            );
            break;
          case 'e':
            setShapes((p) =>
              p.map((shape, i) => {
                return i === index
                  ? {
                      ...shape,
                      x: snapLeft
                        ? 0
                        : rectangleBoundingRect.x + travel.x - containerBoundingRect.x,
                      width: snapLeft
                        ? rectangleBoundingRect.right - containerBoundingRect.x
                        : rectangleBoundingRect.width - travel.x,
                    }
                  : shape;
              }),
            );
            break;
          case 'nw':
            setShapes((p) =>
              p.map((shape, i) => {
                return i === index
                  ? {
                      ...shape,
                      y: snapTop ? 0 : rectangleBoundingRect.y + travel.y - containerBoundingRect.y,
                      height: snapTop
                        ? rectangleBoundingRect.bottom - containerBoundingRect.y
                        : rectangleBoundingRect.height - travel.y,
                      width: snapRight
                        ? containerBoundingRect.width - shape.x
                        : rectangleBoundingRect.width + travel.x,
                    }
                  : shape;
              }),
            );
            break;
          case 'sw':
            setShapes((p) =>
              p.map((shape, i) => {
                return i === index
                  ? {
                      ...shape,
                      height: snapBottom
                        ? containerBoundingRect.height - shape.y
                        : rectangleBoundingRect.height + travel.y,
                      width: snapRight
                        ? containerBoundingRect.width - shape.x
                        : rectangleBoundingRect.width + travel.x,
                    }
                  : shape;
              }),
            );
            break;
          case 'se':
            setShapes((p) =>
              p.map((shape, i) => {
                return i === index
                  ? {
                      ...shape,
                      x: snapLeft
                        ? 0
                        : rectangleBoundingRect.x + travel.x - containerBoundingRect.x,
                      width: snapLeft
                        ? rectangleBoundingRect.right - containerBoundingRect.x
                        : rectangleBoundingRect.width - travel.x,
                      height: snapBottom
                        ? containerBoundingRect.height - shape.y
                        : rectangleBoundingRect.height + travel.y,
                    }
                  : shape;
              }),
            );
            break;
          case 'ne':
            setShapes((p) =>
              p.map((shape, i) => {
                return i === index
                  ? {
                      ...shape,
                      y: snapTop ? 0 : rectangleBoundingRect.y + travel.y - containerBoundingRect.y,
                      height: snapTop
                        ? rectangleBoundingRect.bottom - containerBoundingRect.y
                        : rectangleBoundingRect.height - travel.y,
                      x: snapLeft
                        ? 0
                        : rectangleBoundingRect.x + travel.x - containerBoundingRect.x,
                      width: snapLeft
                        ? rectangleBoundingRect.right - containerBoundingRect.x
                        : rectangleBoundingRect.width - travel.x,
                    }
                  : shape;
              }),
            );
            break;
          default:
            throw new Error('shouldnt get there');
        }
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

export default App;
