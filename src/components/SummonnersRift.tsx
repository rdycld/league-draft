import { ElementRef, memo, useCallback, useEffect, useRef, useState } from 'react';
import { Picks, type ID } from '../routes/Draft';
import { DragOptions, calcDrag, drag } from '../utils/drag';
import { pick } from '../utils/pick';
import { getDragCoordinates } from '../utils/getDragCoordinates';

type Coordinates = {
  x: number;
  y: number;
};

type DupaProps = Coordinates & {
  id: ID;
  onDrag: (event: React.MouseEvent<HTMLDivElement>, index: ID) => void;
};

const Champ = memo(function Champ({ id, onDrag, x, y }: DupaProps) {
  const rectangleRef = useRef<ElementRef<'div'>>(null);

  return (
    <div
      style={{
        userSelect: 'none',
        top: y,
        left: x,
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

type Props = {
  redPicks: Picks;
  bluePicks: Picks;
};

export function SummonersRift({ redPicks, bluePicks }: Props) {
  const [picks, setPicks] = useState<(Coordinates & { id: ID })[]>([]);

  useEffect(() => {
    const newPicks = [
      ...makeDraggable(bluePicks, { x: 0, y: 700 }),
      ...makeDraggable(redPicks, { x: 700, y: 0 }),
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
                }
              : pick;
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
  return (
    <div
      ref={containerRef}
      style={{
        width: 800,
        height: 800,
        border: '1px solid black',
        position: 'relative',
        backgroundImage: 'url(/summoners_rift.png)',
        backgroundSize: 'contain',
      }}
    >
      {picks.map((pick) => (
        <Champ key={pick.id} onDrag={handleDrag} {...pick} />
      ))}
    </div>
  );
}

function makeDraggable(val: Picks, coordinates?: Coordinates) {
  return val
    .filter((el) => Boolean(el))
    .map((el) => ({ x: 0, y: 0, id: el, ...coordinates })) as (Coordinates & { id: ID })[];
}
