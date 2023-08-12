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
  dragThresholdPx?: number;
};

export function drag<T extends HTMLElement>(
  event: React.MouseEvent<T>,
  { onDragStart, onDrag, onClean, dragThresholdPx = 5 }: DragOptions,
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

    if (dragging && getDistance(event, initialPoint) >= dragThresholdPx) {
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

function getDistance(
  point1: Pick<MouseEvent, 'clientX' | 'clientY'>,
  point2: Pick<MouseEvent, 'clientX' | 'clientY'>,
) {
  return ((point1.clientX - point2.clientX) ** 2 + (point1.clientY - point2.clientY) ** 2) ** 0.5;
}

export function snapToEdge(element: DOMRect, container: DOMRect, drag: { x: number; y: number }) {
  const snapTop = element.top + drag.y < container.top;
  const snapRight = element.right + drag.x > container.right;
  const snapBottom = element.bottom + drag.y > container.bottom;
  const snapLeft = element.left + drag.x < container.left;

  const top = snapTop ? 0 : undefined;
  const bottom = snapBottom ? container.height - element.height : undefined;
  const snapY = top ?? bottom;

  const left = snapLeft ? 0 : undefined;
  const right = snapRight ? container.width - element.width : undefined;
  const snapX = left ?? right;

  return { snapTop, snapRight, snapBottom, snapLeft, snapY, snapX };
}
