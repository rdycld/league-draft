import { pick } from './pick';

export type DragOptions = {
  onDragStart?: () => void;
  onDrag: (
    event: PointerEvent,
    element: Element,
    initialPoint: { clientX: number; clientY: number },
  ) => void;
  onDragEnd?: () => void;
  onClean?: () => void;
};

export function drag(
  event: React.MouseEvent<HTMLDivElement>,
  { onDragStart, onDrag, onClean }: DragOptions,
) {
  let cleaned = false;
  let dragging = false;

  const { currentTarget } = event;

  const initialPoint = pick(event, ['clientX', 'clientY']);

  document.documentElement.addEventListener('pointermove', onPointerMove);
  document.documentElement.addEventListener('pointerup', onPointerUp);
  document.documentElement.addEventListener('visibilitychange', clean);

  function onPointerMove(event: PointerEvent) {
    if (!dragging) {
      dragging = true;
      onDragStart?.();
    }

    if (dragging) {
      onDrag(event, currentTarget, initialPoint);
    }
  }

  function onPointerUp() {
    clean();
  }

  function clean() {
    if (cleaned) {
      return;
    }

    cleaned = true;
    onClean?.();

    if (dragging) {
      dragging = false;
      // document.head.removeChild(style);
      // onDragEnd?.();
    }

    document.documentElement.removeEventListener('pointermove', onPointerMove);
    document.documentElement.removeEventListener('pointerup', onPointerUp);
    document.documentElement.removeEventListener('visibilitychange', clean);
  }
}

export function calcDrag(event: PointerEvent, initialPoint: { clientX: number; clientY: number }) {
  const { clientX, clientY } = event;

  return {
    x: clientX - initialPoint.clientX,
    y: clientY - initialPoint.clientY,
  };
}
