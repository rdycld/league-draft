import { ElementRef, RefObject, memo, useCallback, useEffect, useRef, useState } from 'react';
import { Picks, type ID } from '../routes/Draft';
import { DragOptions, calcDrag, drag } from '../utils/drag';
import { pick } from '../utils/pick';
import { getDragCoordinates } from '../utils/getDragCoordinates';
import { draw } from '../utils/draw';
import { assert } from '../utils/assert';

type Coordinates = {
  x: number;
  y: number;
  z: number;
};

type ChampProps = Coordinates & {
  id: ID;
  onDrag: (event: React.MouseEvent<HTMLDivElement>, index: ID) => void;
};

const Champ = memo(function Champ({ id, onDrag, x, y, z }: ChampProps) {
  const rectangleRef = useRef<ElementRef<'div'>>(null);

  return (
    <div
      style={{
        userSelect: 'none',
        top: y,
        left: x,
        zIndex: z,
        position: 'absolute',
        border: '2px solid black',
        width: 50,
        height: 50,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(https://picsum.photos/50)',
        cursor: 'move',
      }}
      ref={rectangleRef}
      onMouseDown={(e) => onDrag(e, id)}
    ></div>
  );
});

const CANVAS_WIDTH = 800 as const;
const CANVAS_HEIGHT = 800 as const;

const Canvas = memo(function Canvas() {
  const canvasRef = useRef<ElementRef<'canvas'>>(null);
  const [color, setColor] = useState('#000');
  const [lineWidth, setLineWidth] = useState(2);
  const [history, setHistory] = useState<ImageData[]>([]);

  const handleSetColor = useCallback((color: string) => {
    setColor(color);
  }, []);

  const addToHistory = (context: CanvasRenderingContext2D) => {
    setHistory((p) => [...p, context.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)]);
  };

  const handleDraw = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      const ctx = getContext(canvasRef);

      draw(event, ctx, {
        color,
        lineWidth,
        onDrawEnd: addToHistory,
      });
    },
    [color, lineWidth],
  );

  const handleClear = () => {
    const ctx = getContext(canvasRef);

    ctx.fillStyle = '#00000000';
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  const handleUndo = () => {
    if (history.length === 0) {
      return;
    }

    if (history.length === 1) {
      setHistory([]);
      handleClear();
      return;
    }
    const ctx = getContext(canvasRef);

    ctx.putImageData(history[history.length - 2], 0, 0);
    setHistory((p) => p.slice(0, p.length - 1));
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onPointerDown={handleDraw}
        style={{
          left: 0,
          top: 0,
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          border: '2px solid black',
          backgroundImage: 'url(/summoners_rift.png)',
          backgroundSize: 'contain',
          cursor: 'crosshair',
        }}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      ></canvas>
      <div
        style={{
          display: 'flex',
          columnGap: 10,
          alignItems: 'center',
        }}
      >
        <input type="color" value={color} onChange={(e) => handleSetColor(e.target.value)} />
        <input
          type="range"
          min={2}
          max={20}
          step={2}
          value={lineWidth}
          onChange={(e) => setLineWidth(parseInt(e.target.value))}
        />
        <button
          onClick={() => handleSetColor('#000000')}
          style={{ width: 20, cursor: 'pointer', height: 20, backgroundColor: 'black' }}
        />
        <button
          onClick={() => handleSetColor('#0000ff')}
          style={{ width: 20, cursor: 'pointer', height: 20, backgroundColor: 'blue' }}
        />
        <button
          onClick={() => handleSetColor('#ff0000')}
          style={{ width: 20, cursor: 'pointer', height: 20, backgroundColor: 'red' }}
        />
        <button
          onClick={() => handleSetColor('#00ffff')}
          style={{ width: 20, cursor: 'pointer', height: 20, backgroundColor: 'cyan' }}
        />
        <button
          onClick={() => handleSetColor('#ff00ff')}
          style={{ width: 20, cursor: 'pointer', height: 20, backgroundColor: 'magenta' }}
        />
        <button
          onClick={() => handleSetColor('#ffff00')}
          style={{ width: 20, cursor: 'pointer', height: 20, backgroundColor: 'yellow' }}
        />
        <button onClick={handleUndo}>undo</button>
        <button onClick={handleClear}> clear</button>
      </div>
    </div>
  );
});

type Props = {
  redPicks: Picks;
  bluePicks: Picks;
};

export function SummonersRift({ redPicks, bluePicks }: Props) {
  const [picks, setPicks] = useState<(Coordinates & { id: ID })[]>([]);
  const zIndex = useRef(2);

  useEffect(() => {
    const newPicks = [
      ...makeDraggable(bluePicks, { x: 0, y: 700, z: 1 }),
      ...makeDraggable(redPicks, { x: 700, y: 0, z: 1 }),
    ];

    setPicks((p) => newPicks.map((pick) => p.find((el) => el.id === pick.id) ?? pick));
  }, [redPicks, bluePicks]);

  const containerRef = useRef<ElementRef<'div'>>(null);

  const handleDrag = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, id: ID, options?: DragOptions) => {
      if (!containerRef.current) {
        return;
      }

      const rectangle = event.currentTarget.getBoundingClientRect();
      const container = containerRef.current.getBoundingClientRect();
      const initialPoint = pick(event, ['clientX', 'clientY']);

      const onDrag = (event: PointerEvent) => {
        const drag = calcDrag(event, initialPoint);

        const coordinates = getDragCoordinates(rectangle, container, drag);

        setPicks((p) =>
          p.map((pick) => {
            return pick.id === id
              ? {
                  ...pick,
                  ...coordinates,
                  z: zIndex.current,
                }
              : pick;
          }),
        );
      };

      drag(event, {
        onDrag,
        onClean: () => {
          zIndex.current += 1;
        },
        ...options,
      });
    },
    [],
  );
  return (
    <div
      ref={containerRef}
      style={{
        flexShrink: 0,
        width: 800,
        height: 800,
        border: '1px solid black',
        position: 'relative',
      }}
    >
      {picks.map((pick) => (
        <Champ key={pick.id} onDrag={handleDrag} {...pick} />
      ))}
      <Canvas />
    </div>
  );
}

function getContext(ref: RefObject<HTMLCanvasElement>) {
  assert(ref.current);

  const context = ref.current.getContext('2d');

  assert(context);

  return context;
}

function makeDraggable(val: Picks, coordinates?: Coordinates) {
  return val
    .filter((el) => Boolean(el))
    .map((el) => ({ x: 0, y: 0, id: el, ...coordinates })) as (Coordinates & { id: ID })[];
}
