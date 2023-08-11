import { useState, useCallback, useRef, ElementRef, RefObject } from 'react';
import { pick } from './utils/pick';
import { drag, calcDrag } from './utils/drag';
import { Rectangle } from './components/Rectangle';
import { Direction, normalizeDotPosition } from './components/ResizeDot';

export type Shape = {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
};

function App() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const containerRef = useRef<ElementRef<'div'>>(null);

  const addShape = () => {
    setShapes((p) => [...p, { x: 0, y: 0, z: p.length + 1, width: 200, height: 200 }]);
  };

  const handleDrag = useCallback((event: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (!containerRef.current) {
      return;
    }

    const currentShape = event.currentTarget.getBoundingClientRect();
    const containerBoundingRect = containerRef.current.getBoundingClientRect();
    const initialPoint = pick(event, ['clientX', 'clientY']);

    const onDrag = (event: PointerEvent) => {
      const travel = calcDrag(event, initialPoint);
      setShapes((p) =>
        p.map((shape, i) => {
          return i === index
            ? {
                ...shape,
                x: currentShape.x + travel.x - containerBoundingRect.x,
                y: currentShape.y + travel.y - containerBoundingRect.y,
                z: 2,
              }
            : { ...shape, z: 1 };
        }),
      );
    };

    drag(event, {
      onDrag,
    });
  }, []);

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

      const currentPoint = event.currentTarget.getBoundingClientRect();
      const rectangleBoundingRect = rectangleRef.current!.getBoundingClientRect();
      const containerBoundingRect = containerRef.current.getBoundingClientRect();

      const initialPoint = pick(event, ['clientX', 'clientY']);

      const onDrag = (event: PointerEvent) => {
        const travel = calcDrag(event, initialPoint);

        switch (direction) {
          case 'n':
            setShapes((p) =>
              p.map((shape, i) => {
                return i === index
                  ? {
                      ...shape,
                      y: currentPoint.y + travel.y - containerBoundingRect.y,
                      height: rectangleBoundingRect.height - travel.y - containerBoundingRect.y,
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
                      width: rectangleBoundingRect.width + travel.x - containerBoundingRect.x,
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
                      height: rectangleBoundingRect.height + travel.y - containerBoundingRect.y,
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
                      x: currentPoint.x + travel.x - containerBoundingRect.x,
                      width: rectangleBoundingRect.width - travel.x - containerBoundingRect.x,
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
                      y: currentPoint.y + travel.y - containerBoundingRect.y,
                      height: rectangleBoundingRect.height - travel.y - containerBoundingRect.y,
                      width: rectangleBoundingRect.width + travel.x - containerBoundingRect.x,
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
                      height: rectangleBoundingRect.height + travel.y - containerBoundingRect.y,
                      width: rectangleBoundingRect.width + travel.x - containerBoundingRect.x,
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
                      height: rectangleBoundingRect.height + travel.y - containerBoundingRect.y,
                      x: currentPoint.x + travel.x - containerBoundingRect.x,
                      width: rectangleBoundingRect.width - travel.x - containerBoundingRect.x,
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
                      y: currentPoint.y + travel.y - containerBoundingRect.y,
                      height: rectangleBoundingRect.height - travel.y - containerBoundingRect.y,
                      x: currentPoint.x + travel.x - containerBoundingRect.x,
                      width: rectangleBoundingRect.width - travel.x - containerBoundingRect.x,
                    }
                  : shape;
              }),
            );
            break;
          case 'n':
            setShapes((p) =>
              p.map((shape, i) => {
                return i === index
                  ? {
                      ...shape,
                      y: currentPoint.y + travel.y - containerBoundingRect.y,
                      height: rectangleBoundingRect.height - travel.y - containerBoundingRect.y,
                    }
                  : shape;
              }),
            );
            break;

          default:
            break;
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
        style={{ width: 800, height: 800, position: 'relative', border: '1px solid black' }}
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
