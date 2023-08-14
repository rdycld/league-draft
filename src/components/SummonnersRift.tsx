import { ElementRef, memo, useCallback, useEffect, useRef, useState } from 'react';
import { Picks, type ID } from '../routes/Draft';
import { DragOptions, calcDrag, drag } from '../utils/drag';
import { pick } from '../utils/pick';
import { getDragCoordinates } from '../utils/getDragCoordinates';
import { draw } from '../utils/draw';

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

const Canvas = memo(function Canvas() {
  const canvasRef = useRef<ElementRef<'canvas'>>(null);
  const [color, setColor] = useState('#000');
  const [lineWidth, setLineWidth] = useState(2);

  const handleSetColor = useCallback((color: string) => {
    setColor(color);
  }, []);

  const handleDraw = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current) {
        return;
      }

      const ctx = canvasRef.current.getContext('2d');

      if (!ctx) {
        return;
      }

      draw(event, ctx, {
        color,
        lineWidth,
      });
    },
    [color, lineWidth],
  );

  return (
    <div>
      <canvas
        ref={canvasRef}
        onPointerDown={handleDraw}
        style={{
          left: 0,
          top: 0,
          width: 800,
          height: 800,
          border: '1px solid red',
          backgroundImage: 'url(/summoners_rift.png)',
          backgroundSize: 'contain',
        }}
        width={800}
        height={800}
      ></canvas>
      <div
        style={{
          display: 'flex',
          columnGap: 10,
          alignItems: 'center',
        }}
      >
        <input type="color" onChange={(e) => handleSetColor(e.target.value)} />
        <input
          type="range"
          min={2}
          max={20}
          step={2}
          value={lineWidth}
          onChange={(e) => setLineWidth(parseInt(e.target.value))}
        />
        <button
          onClick={() => handleSetColor('#000')}
          style={{ width: 20, cursor: 'pointer', height: 20, backgroundColor: 'black' }}
        />
        <button
          onClick={() => handleSetColor('#00f')}
          style={{ width: 20, cursor: 'pointer', height: 20, backgroundColor: 'blue' }}
        />
        <button
          onClick={() => handleSetColor('#f00')}
          style={{ width: 20, cursor: 'pointer', height: 20, backgroundColor: 'red' }}
        />
        <button
          onClick={() => handleSetColor('#0ff')}
          style={{ width: 20, cursor: 'pointer', height: 20, backgroundColor: 'cyan' }}
        />
        <button
          onClick={() => handleSetColor('#f0f')}
          style={{ width: 20, cursor: 'pointer', height: 20, backgroundColor: 'magenta' }}
        />
        <button
          onClick={() => handleSetColor('#ff0')}
          style={{ width: 20, cursor: 'pointer', height: 20, backgroundColor: 'yellow' }}
        />
        <button>undo</button>
        <button> clear</button>
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
          zIndex.current = zIndex.current + 1;
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

function makeDraggable(val: Picks, coordinates?: Coordinates) {
  return val
    .filter((el) => Boolean(el))
    .map((el) => ({ x: 0, y: 0, id: el, ...coordinates })) as (Coordinates & { id: ID })[];
}
