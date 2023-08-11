import { useState,  MouseEvent, useCallback, useRef, ElementRef } from 'react';
import { pick } from './utils/pick';
import { drag, calcDrag } from './utils/drag';
import {  Rectangle } from './components/Rectangle';

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

  const handleDrag = useCallback((event: MouseEvent<HTMLDivElement>, index: number) => {
    if (!containerRef.current) {
      return;
    }

    const currentShape = event.currentTarget.getBoundingClientRect();
    const containerBoundingRect = containerRef.current?.getBoundingClientRect();
    const initialPoint = pick(event, ['clientX', 'clientY']);

    const onDrag = (event: PointerEvent) => {
      setShapes((p) =>
        p.map((shape, i) => {
          const travel = calcDrag(event, initialPoint);
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

  return (
    <>
      <div
        ref={containerRef}
        style={{ width: 800, height: 800, position: 'relative', border: '1px solid black' }}
      >
        {shapes.map((shape, index) => (
          <Rectangle key={index} {...shape} index={index} onDrag={handleDrag} />
        ))}
      </div>
      <button onClick={addShape}>add rect</button>
    </>
  );
}

export default App;
