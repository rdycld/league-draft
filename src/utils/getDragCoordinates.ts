import { snapToEdge } from './drag';

export function getDragCoordinates(
  element: DOMRect,
  container: DOMRect,
  drag: { x: number; y: number },
) {
  const { snapLeft, snapBottom, snapRight, snapTop } = snapToEdge(element, container, drag);

  const top = snapTop ? 0 : undefined;
  const bottom = snapBottom ? container.height - element.height : undefined;
  const y = top ?? bottom ?? element.y + drag.y - container.y;

  const left = snapLeft ? 0 : undefined;
  const right = snapRight ? container.width - element.width : undefined;
  const x = left ?? right ?? element.x + drag.x - container.x;

  return { y, x };
}
