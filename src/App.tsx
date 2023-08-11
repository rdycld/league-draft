import { useState, memo, MouseEvent, useCallback, useRef, ElementRef } from 'react';
import { pick } from './utils/pick';
import { drag, calcDrag } from './utils/drag';

type Rectangle = {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
};

type RectangleProps = {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  index: number;
  onDrag: (event: MouseEvent<HTMLDivElement>, index: number) => void;
};

const Rectangle = memo(function Rectangle({
  x,
  y,
  z,
  width,
  height,
  index,
  onDrag,
}: RectangleProps) {
  return (
    <div
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
    </div>
  );
});

function App() {
  const [shapes, setShapes] = useState<Rectangle[]>([]);
  const containerRef = useRef<ElementRef<'div'>>(null);

  const addRect = () => {
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
      hihi
      <button onClick={addRect}>add rect</button>
    </>
  );
}

export default App;
